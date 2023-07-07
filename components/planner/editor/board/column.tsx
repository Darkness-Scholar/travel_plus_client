const Column: React.FC<any> = ({ isOver, children }) => {

    const className = isOver ? "highlight":""


    return <div className={className + "min-h-[16rem] w-[10rem] bg-red-500"}>
        { children }
    </div>
}

export default Column