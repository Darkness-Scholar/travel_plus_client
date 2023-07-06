"use client"

import { Activity } from "@/dummy/activities.dummy";
import { Draggable, DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps, Droppable } from "react-beautiful-dnd";

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string,
    name: string,
    data: Array<Activity>
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number
    id: string
    innerRef: (element: HTMLElement | null) => void
    draggableProps: DraggableProvidedDraggableProps
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
    data: Activity
}

const Item: React.FC<ItemProps> = ({ index, id, data, innerRef, draggableProps, dragHandleProps, ...rest }) => {
    return <div ref={innerRef} {...dragHandleProps} {...draggableProps}>
        <h3 className="text-black">{ data.title }</h3>
    </div>
}

let randomIndex = (dice) => {
    return Math.round(Math.random() * dice)
}

const Column: React.FC<ColumnProps> = ({ id, name, data }) => {
    return <Draggable draggableId={id} index={Number(id)}>
        {
            (provided) => <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                {/* render droppable */}

                <Droppable droppableId={String(randomIndex(25343512))} type="card">
                    {
                        (provided, snapshot) => <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`pb-2 p-2 rounded-xl shadow-xl ${snapshot.isDraggingOver ? "bg-red-500" : "bg-white"}`}
                        >
                            <div className="space-y-2">
                                {data.map((i, index) => {
                                    return <Draggable
                                        key={i.id}
                                        draggableId={i.id}
                                        index={index}
                                    >
                                        {
                                            (provided) => <Item
                                                id={id}
                                                index={index}
                                                data={i}
                                                innerRef={provided.innerRef}
                                                draggableProps={provided.draggableProps}
                                                dragHandleProps={provided.dragHandleProps}
                                            />
                                        }
                                    </Draggable>
                                })}
                            </div>
                        </div>
                    }
                </Droppable>
            </div>
        }
    </Draggable>
}

export default Column