"use client"
import { useState } from "react"
import { data, statuses, Record } from "./dummy"
import DropWrapper from "./dropwrapper"
import Column from "./column"
import Item from "./item"

const BoardContainer: React.FC<any> = () => {

    const [items, setItems] = useState(data)

    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(i => i.status === status)

        setItems(prevState => {
            const newItems = prevState.filter(i => i.id !== item.id).concat({
                ...item, status, icon: mapping.icon
            })

            return [...newItems]
        })
    }

    const moveItem = (dragIndex: number, hoverIndex: number) => {
        const item = items[dragIndex]
        setItems(prevState => {

            const newItems = prevState.filter((i, idx) => idx !== dragIndex)
            newItems.splice(hoverIndex, 0, item)
            return [...newItems]
        })
    }

    return <div className="row flex">
        {
            statuses.map(s => {
                return <div key={status} className="col-wrapper">
                    <h2 className="text-black">{s.status}</h2>
                    <DropWrapper onDrop={onDrop} status={s.status}>
                        <Column>
                            { items
                                .filter(i => i.status === s.status)
                                .map((i, idx) => <Item
                                    key={i.id}
                                    item={i}
                                    index={idx}
                                    moveItem={moveItem}
                                    status={s}
                                />)
                            }
                        </Column>
                    </DropWrapper>
                </div>
            })
        }
    </div>
}

export default BoardContainer