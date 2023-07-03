"use client"
import { useState } from "react"
import { Select } from 'antd'
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

const Body: React.FC<any> = () => {

    const [activities, setActivities] = useState<Array<{ id: string, name: string, age: number, job: string }>>([
        { id: "1", name: "tung", age: 24, job: "software engineer" },
        { id: "2", name: "hwang", age: 25, job: "content creator" },
        { id: "3", name: "darkness", age: 23, job: "joker" },
    ])


    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
      });

    const handleOnDragEnd = (res: DropResult) => {
        if (!res.destination) {
            return;
        }

        const items = reorder(
            activities,
            res.source.index,
            res.destination.index
        );

        setActivities(items as Array<{ id: string, name: string, age: number, job: string }>)
    }

    const grid = 8

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        background: isDragging ? "lightgreen" : "grey",

        ...draggableStyle
    });

    return <div className="flex">
        <div className="trip-date pl-8 py-4">
            <p className='text-black text-lg font-semibold'>Start date</p>
            <button className="mr-4 px-4 py-1 border-[0.4px] bg-gray-200 rounded-md border-solid border-gray-300 text-gray-600">
                Jul 08, 2023
            </button>

            <div className="dates flex flex-col mt-6 w-full">
                <div className="date-selected border-orange-500 border-solid border-l-[2px] bg-gray-100 px-6 py-4">
                    <p className="float-right text-black text-lg font-semibold">Jul 08</p>
                </div>

                <div className="date-selected px-6 py-4">
                    <p className="float-right text-black text-lg font-semibold">Jul 09</p>
                </div>

                <div className="date-selected px-6 py-4">
                    <p className="float-right text-black text-lg font-semibold">Jul 10</p>
                </div>
            </div>

        </div>
        <div className='px-10 py-4 bg-gray-100'>
            <div className="flex items-center justify-center space-x-12">
                <p className="text-lg font-bold text-red-500">0 VND</p>
                <p className="text-md font-bold text-orange-500">MAP VIEW</p>
            </div>
            <p className="text-sm text-red-500">Clear day</p>
            <div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {activities.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                {item.name}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    </div>
}

export default Body