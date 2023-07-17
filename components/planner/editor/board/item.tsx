import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const Item: React.FC<any> = ({ id, data }) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data: { ...data }
    })

    const dndKitColStyle = {
        transform: CSS.Translate.toString(transform),
        transition
    }

    return <div ref={setNodeRef} style={dndKitColStyle} {...attributes} {...listeners}>
        <h1>Hello</h1>
    </div>
}

export default Item