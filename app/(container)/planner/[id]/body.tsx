"use client"
import { useState } from "react"
import { Select } from 'antd'
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

const Body: React.FC<any> = () => {

    const [activities, setActivities] = useState<Array<{ id: string, name: string, age: number, job: string }>>([
        { id: "1", name: "tung", age: 24, job: "software engineer" },
        { id: "2", name: "hwang", age: 25, job: "content creator" },
        { id: "3", name: "darkness", age: 23, job: "joker" },
        { id: "4", name: "darkness", age: 22, job: "joker" },
        { id: "5", name: "darkness", age: 21, job: "joker" },
        { id: "6", name: "darkness", age: 27, job: "joker" },
    ])


    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const getListStyle = isDraggingOver => ({
        // background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: 0,
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
        margin: `0 0 ${grid}px 0`,
        backgroundImage: `url(https://picsum.photos/400/220)`,
        // background: isDragging ? "lightgreen" : "grey",

        ...draggableStyle
    });

    return <div className="flex">
        <div className="trip-date pl-8 py-4 w-[15%]">
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
        <div className='w-[30%] px-10 py-4 bg-gray-100 max-h-[90vh] overflow-y-auto'>
            <div className="mt-4 flex items-center justify-center space-x-12">
                <p className="text-lg font-bold text-red-500">0 VND</p>
                <p className="text-md font-bold text-orange-500">MAP VIEW</p>
            </div>
            <p className="text-sm text-red-500 mb-2">Clear day</p>
            <div className="mt-6">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                className="grid grid-cols-1 gap-5"
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
                                                className="px-6 py-8 drop-shadow-xl bg-center bg-cover rounded-lg"
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

        <div className="w-[55%] bg-white">
            
        </div>
    </div>
}

export default Body