"use client"
import { DndContext, DragEndEvent, PointerSensor, useSensors, useSensor, MouseSensor, TouchSensor } from '@dnd-kit/core'
import { useState } from 'react'
import Columns, { Column } from './columns'
import { arrayMove } from '@dnd-kit/sortable'

const BoardProvider: React.FC<any> = ({ children }) => {

    const pointerSensor = useSensor(PointerSensor, {activationConstraint: {distance: 10}})

    const mouseSensor = useSensor(MouseSensor, {activationConstraint: {distance: 10}})
    const touchSensor = useSensor(TouchSensor, {activationConstraint: {delay: 250, tolerance: 5}})

    const sensors = useSensors(mouseSensor, touchSensor)

    const [items, setItems] = useState<any>(['1', '2', '3', '4'])

    const onDragEnd = (event: DragEndEvent) => {

        const { active, over } = event

        if (!over) return null

        if (active.id !== over.id) {
            // keo tha 
            const oldIndex = items.findIndex(c => c === active.id)
            const newIndex = items.findIndex(c => c === over.id)

            const dndColums = arrayMove(items, oldIndex, newIndex)

            console.log(dndColums)

            // SET vao DB

            setItems(dndColums)
        }
        
    }


    return <DndContext onDragEnd={onDragEnd} sensors={sensors}>
        <div className=''>
            <Columns colums={items}>

            </Columns>
        </div>
    </DndContext>
}

export default BoardProvider