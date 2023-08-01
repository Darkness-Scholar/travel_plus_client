"use client"
import { useSortable } from "@dnd-kit/sortable"
import { Modal } from "antd"
import { CSS } from "@dnd-kit/utilities"
import useToggle from "@/helpers/toggle"

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    data: {
        _id: string,
        name: string,
        description: string
    }
}

const Item: React.FC<ItemProps> = ({ data }) => {

    const { isOpen, open, close } = useToggle()

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: data._id,
        data: { ...data }
    })

    const dndKitItemStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : null,
        border: isDragging ? '1px solid #2ecc71' : null,
    }

    return <div ref={setNodeRef} style={dndKitItemStyle} {...attributes} {...listeners}>
        <Modal open={isOpen} title={data.name} onCancel={close} onOk={close}>
            <p>{data.description}</p>
        </Modal>
        <div onClick={open} className="rounded-md py-2 border-l-[3px] border-sky-600 border-solid bg-gray-400 px-2 shadow-lg drop-shadow-lg">
            <p>{ data.name }</p>
        </div>
    </div>
}

export default Item