"use client"
import React from "react"
import { useDrop } from "react-dnd"
import { Record } from "./dummy"

export const statuses: Array<{status:string, icon:string,color:string}> = [
    {
        status: "open",
        icon: "⚡",
        color: "#EB5A46"
    },
    {
        status: "done",
        icon: "👌",
        color: "#3981DE"
    }
]

const ITEM_TYPE = "ITEM"

const DropWrapper: React.FC<any> = ({ onDrop, children, status }) => {
    
    const [collected, drop] = useDrop(() => ({
            accept: ITEM_TYPE,
            canDrop: (item, monitor) => {
                const itemIndex = statuses.findIndex(i => i.status === i.status)
                const statusIndex = statuses.findIndex(i => i.status === status)
                return [itemIndex  + 1, itemIndex - 1, itemIndex].includes(statusIndex)
            }, drop(item, monitor) {
                onDrop(item, monitor, status)
            }, collect(monitor) {
                return ({
                    isOver: monitor.isOver()
                })
            },
    }))

    return <div
        ref={drop} className="drop-wrapper"
    >
        {React.cloneElement(children, { isOver: collected.isOver })}
    </div>
}

export default DropWrapper