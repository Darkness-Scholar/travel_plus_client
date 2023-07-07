"use client"
import { useDrag, useDrop } from "react-dnd"
import { useState, useRef } from "react"
// import Window from "./window"

const ITEM_TYPE = "ITEM"

const Item: React.FC<any> = ({ item, index, moveItem, status }) => {

    const itemRef = useRef<HTMLDivElement>(null)
    const [_, drop] = useDrop({
        accept: ITEM_TYPE,
        hover:(item: any, monitor) => {
            if (!itemRef.current) {
                return 
            }

            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = itemRef.current.getBoundingClientRect()
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2
            const mousePosition = monitor.getClientOffset()
            const hoverClientY = mousePosition.y - hoveredRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            moveItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    const [collected, drag] = useDrag(() => ({
        type: ITEM_TYPE,
        item: { index, ...item },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }))

    drag(drop(itemRef))
    
    return <div
        ref={itemRef}
        style={{ opacity: collected.isDragging ? 0:1 }}
        className="item"
        onClick={()=>console.log(`TEST DRAG AND DROP`)}
    >
        <div className="bg-green-500 rounded-lg px-8 py-2">
            <h2>{item.content}</h2>
        </div>
    </div>
}

export default Item