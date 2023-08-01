"use client"
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensors, useSensor, MouseSensor, TouchSensor, DragStartEvent, DropAnimation, defaultDropAnimationSideEffects, DragOverEvent } from '@dnd-kit/core'
import { useCallback, useState } from 'react'
import Columns, { Column } from './columns'
import { arrayMove } from '@dnd-kit/sortable'
import board_dummy from './board_dummy'
import { cloneDeep } from "lodash"
import Item from './item'
import { BoardColumn } from '@/types/board.types'

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

    const [items, setItems] = useState<Array<BoardColumn>>(board_dummy)

    const [activeDragDropItem, setActiveDragDropItem] = useState<any>()

    const findColumnByRowId = (id: string) => {
        return items.find(col => col.activities.map(row => row._id)?.includes(id))
    }

    const onDragStart = (event: DragStartEvent) => {
        console.log(`on start:`, event.active.data.current)
        setActiveDragDropItem(event.active.data.current)
    }

    const onDragOver = (event: DragOverEvent) => {
        console.log(`drag over:`, event)
        const { active, over } = event
        if (activeDragDropItem.type !== "row") {
            return
        }
        if (!active || !over) return 

        // Dang keo cai gi:
        const { id: activeDraggingItemId, data: { current: activeDraggingItemData } } = active
        // Keo qua cai gi:
        const { id: overItemId } = over

        // Tim 2 column keo qua lai bang row id
        const activeColumn = findColumnByRowId(activeDraggingItemId as string)
        const overColumn = findColumnByRowId(overItemId as string)

        // if (activeColumn || overColumn) return

        if (activeColumn._id !== overColumn._id) {

            setItems(prevCols => {
                const overRowIndex = overColumn.activities.findIndex(row => row._id === overItemId)
                console.log(`over index:`, overRowIndex)

                let newRowIndex: number
                const isBelowOverItem =
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                    over.rect.top + over.rect.height

                const modifier = isBelowOverItem ? 1:0
                newRowIndex = overRowIndex >=0 ? overRowIndex + modifier : overColumn.activities.length + 1
                const nextColumns = cloneDeep(prevCols) as Array<BoardColumn>
                const nextActiveColumn = nextColumns.find(col => col._id === activeColumn._id)
                const nextOverColumn = nextColumns.find(col => col._id === overColumn._id)
                
                if (nextActiveColumn) {
                    nextActiveColumn.activities = nextActiveColumn.activities.filter(row => row._id !== activeDraggingItemId)
                }

                if (nextOverColumn) {
                    nextOverColumn.activities = nextOverColumn.activities.filter(row => row._id !== activeDraggingItemId)
                    // @ts-ignore
                    nextOverColumn.activities = nextOverColumn.activities.toSpliced(newRowIndex, 0, activeDraggingItemData)
                }
                
                return nextColumns
            })
        }
    }
    
    const onDragEnd = (event: DragEndEvent) => {

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

    return <DndContext onDragEnd={onDragEnd} onDragOver={onDragOver} onDragStart={onDragStart} sensors={sensors}>
        <div className='w-full h-screen'>
            <Columns columns={items}>

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