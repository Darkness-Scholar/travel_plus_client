"use client"
import { DndContext, DragEndEvent, PointerSensor, useSensors, useSensor, MouseSensor, TouchSensor } from '@dnd-kit/core'
import { useCallback, useState } from 'react'
import Columns, { Column } from './columns'
import { arrayMove } from '@dnd-kit/sortable'
import board_dummy from './board_dummy'

const BoardProvider: React.FC<any> = ({ children }) => {

    const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })

    const sensors = useSensors(mouseSensor, touchSensor)

    const [items, setItems] = useState<any>(board_dummy)

    const onDragEnd = (event: DragEndEvent) => {

        console.log(`items before:`, items)

        const { active, over } = event

        if (!over) return null

        if (active.id !== over.id) {
            // keo tha 
            const oldIndex = items.findIndex(c => c._id === active.id)
            const newIndex = items.findIndex(c => c._id === over.id)

            const dndColums = arrayMove(items, oldIndex, newIndex)

            // SET vao DB

            setItems(dndColums)
        }

        console.log(`items after:`, items)
    }


    return <DndContext onDragEnd={onDragEnd} sensors={sensors}>
        <div className='w-full bg-red-400'>
            <Columns colums={items}>

            </Columns>
        </div>
    </DndContext>
}

export default BoardProvider