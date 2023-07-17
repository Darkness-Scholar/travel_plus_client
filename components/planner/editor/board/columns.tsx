"use client"
import { SortableContext, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Input } from "antd"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import Item from "./item"
import { useState } from "react"
import useToggle from "@/helpers/toggle"

interface ColumnsProps extends React.HTMLAttributes<HTMLDivElement> {
    colums: Array<any>
}

const Colums: React.FC<ColumnsProps> = ({ colums }) => {
    return <SortableContext items={colums.map(i => i._id)} strategy={horizontalListSortingStrategy}>
        <div className="flex space-x-4 p-4 min-w-[12rem]">
            {colums.map((item) => <Column 
                id={item._id} 
                key={item._id} 
                data={item._id}
            />)}
        </div>
    </SortableContext>
}

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string
    data: any
}

export const Column: React.FC<ColumnProps> = ({ id, data, ...rest }) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data: { ...data }
    })

    const { isOpen, open, close } = useToggle()

    const dndKitColStyle = {
        transform: CSS.Translate.toString(transform),
        transition
    }

    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const handleDragEnd = (event: DragEndEvent) => {
        console.log(`event 37:`, event)
    }

    const handlePreColumnChange = () => {
        setIsEditMode(!isEditMode)
    }

    return <div ref={setNodeRef} className="rounded-lg px-4 py-2 border-lg bg-gray-100" style={dndKitColStyle} {...attributes} {...listeners}>
        { isOpen ? <Input className="col-name-editor" suffix={<button onClick={close} className="border-lg px-2 rounded-full">x</button>}/>
        : <h2 onClick={open} className="text-gray-700 text-lg">{id}</h2> }

        {/*<DndContext onDragEnd={handleDragEnd}>
            <SortableContext items={['11', '22', '33', '44', '55']} strategy={horizontalListSortingStrategy}>
                <div className="cards space-y-2">
                    { ['11', '22', '33', '44', '55'].map((item) => <Item id={item} key={item} data={item} />) }
                </div>
            </SortableContext>
        </DndContext>*/}

    </div>

}

export default Colums