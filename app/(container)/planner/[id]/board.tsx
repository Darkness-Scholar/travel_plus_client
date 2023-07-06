"use client"
import { useState } from "react"
import activities_dummy, { Activity, BoardTypes } from "@/dummy/activities.dummy"
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd"
import Column from "./Column"

interface Props extends React.HTMLAttributes<HTMLDivElement> {

}


const Board: React.FC<Props> = () => {

    const [board, setBoard] = useState<BoardTypes>(activities_dummy)

    const handleDragEnd = (values: DropResult) => {

    }

    return <div>
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="column">
                {
                    (provided) => {
                        return <div className="grid grid-cols-1 gap-4"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >    
                            <Column id="1" name="activites" data={board.activities}/>
                            <Column id="2" name="template" data={board.template}/>
                        </div>
                    }
                }
            </Droppable>
        </DragDropContext>
    </div>
}

export default Board