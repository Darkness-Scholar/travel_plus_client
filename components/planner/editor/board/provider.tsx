"use client"
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensors, useSensor, MouseSensor, TouchSensor, DragStartEvent, DropAnimation, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { useCallback, useState } from 'react'
import Columns, { Column } from './columns'
import { arrayMove } from '@dnd-kit/sortable'
import board_dummy from './board_dummy'
import Item from './item'

const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: { opacity: '0.5' }
        }
    })
}

const BoardProvider: React.FC<any> = ({ children }) => {

    // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
    const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })

    const sensors = useSensors(mouseSensor, touchSensor)

    const [items, setItems] = useState<any>(board_dummy)

    const [activeDragDropItem, setActiveDragDropItem] = useState<any>()

    const onDragStart = (event: DragStartEvent) => {
        console.log(`on start:`, event.active.data.current)
        setActiveDragDropItem(event.active.data.current)
    }
    
    const onDragEnd = (event: DragEndEvent) => {

        console.log(`drag and drop type:`, activeDragDropItem.type)

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

        setActiveDragDropItem(null)

    }

    return <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart} sensors={sensors}>
        <div className='w-full h-scree'>
            <Columns colums={items}>

            </Columns>
            <DragOverlay dropAnimation={dropAnimation}>
                {(!activeDragDropItem) && null}
                {(activeDragDropItem && activeDragDropItem.type === "column") && <Column data={activeDragDropItem}/>}
                {(activeDragDropItem && activeDragDropItem.type === "row") && <Item data={activeDragDropItem}/>}
            </DragOverlay>
        </div>
    </DndContext>
}

export default BoardProvider