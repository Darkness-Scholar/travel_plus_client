"use client"
import { useRouter } from "next/navigation"

interface ItineraryProps extends React.HTMLAttributes<HTMLDivElement> {
    data?: any
}

const Itinerary: React.FC<ItineraryProps> = ({ data, ...rest }) => {

    let router = useRouter()

    return <div className="px-8">
        <p>Itinerary</p>
        <button onClick={()=>router.push("/planner/planner_id")} className="">Edit on map</button>
    </div>
}

export default Itinerary