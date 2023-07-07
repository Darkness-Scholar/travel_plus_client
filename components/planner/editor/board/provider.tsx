import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const BoardProvider: React.FC<any> = ({ children }) => {
    return <DndProvider backend={HTML5Backend}>
          { children }
    </DndProvider>
}

export default BoardProvider