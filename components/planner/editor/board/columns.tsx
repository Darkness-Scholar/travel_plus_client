"use client"
import { SortableContext, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface ColumnsProps extends React.HTMLAttributes<HTMLDivElement> {
    colums: Array<any>
}

const Colums: React.FC<ColumnsProps> = ({ colums }) => {
    return <SortableContext items={colums} strategy={horizontalListSortingStrategy}>
        <div className="flex space-x-4 bg-green-500 p-4 w-full">
            { colums.map((item) => <Column id={item} key={item} data={item}/>) }
        </div>
    </SortableContext>
}

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string
    data: any
}

 export const Column: React.FC<ColumnProps> = ({ id, data, ...rest }) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        data: { ...data }
    })

    const dndKitColStyle = {
        transform: CSS.Translate.toString(transform),
        transition
    }

    return <div ref={setNodeRef} className="rounded-lg px-4 py-2 border-lg bg-gray-100" style={dndKitColStyle} {...attributes} {...listeners}>
        <h2 className="text-gray-700 text-lg">DD/MM/YYYY Activities</h2>

        <div className="cards space-y-2">
            <div className="rounded-lg bg-gray-300 w-full px-4 py-2">
                Card item title
            </div>
            <div className="rounded-lg bg-gray-300 w-full px-4 py-2">
                Card item title
            </div>

            <div className="rounded-lg bg-gray-300 w-full px-4 py-2">
                Card item title
            </div>
            <div className="rounded-lg bg-gray-300 w-full px-4 py-2">
                Card item title
            </div>
            <div className="rounded-lg bg-gray-300 w-full px-4 py-2">
                Card item title
            </div>
        </div>

    </div>

}

export default Colums