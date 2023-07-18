"use client"
import { SortableContext, horizontalListSortingStrategy, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Input } from "antd"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import Item from "./item"
import { useState } from "react"
import useToggle from "@/helpers/toggle"
import { ColumnType } from "./board_dummy"

interface ColumnsProps extends React.HTMLAttributes<HTMLDivElement> {
    colums: Array<ColumnType>
}

const Colums: React.FC<ColumnsProps> = ({ colums }) => {
    return <SortableContext items={colums.map(i => i._id)} strategy={horizontalListSortingStrategy}>
        <div className="flex space-x-4 p-4 min-w-[12rem]">
            {colums.map((item) => <Column
                id={item._id}
                key={item._id}
                data={item}
            />)}
        </div>
    </SortableContext>
}

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    id?: string
    data: ColumnType
}

export const Column: React.FC<ColumnProps> = ({ id, data, ...rest }) => {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: id ?? null,
        data: { ...data }
    })

    const { isOpen, open, close } = useToggle((status) => console.log(status))

    const dndKitColStyle = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined
    }

    return <div ref={setNodeRef} className="rounded-lg min-w-[240px]" style={dndKitColStyle} {...attributes} {...listeners}>
        <div className="column-header bg-white px-4 py-2 rounded-t-lg">
            {isOpen ? <Input style={{width: '100%'}} placeholder="Change name" onPressEnter={close} className="col-name-editor" suffix={<button onClick={close}>
                <img src="/icons/close.svg" alt="" />
            </button>} />
                : <h2 onClick={open} className="text-gray-700 text-lg">{data.date}</h2>}
        </div>
        <SortableContext items={data.activities.map(i => i._id)} strategy={verticalListSortingStrategy}>
            <div className="cards space-y-2 bg-gray-200 p-3 rounded-b-lg">
                {data.activities.map((item, index) => <Item id={item._id} key={index} data={item} />)}
            </div>
        </SortableContext>
    </div>

}

export default Colums