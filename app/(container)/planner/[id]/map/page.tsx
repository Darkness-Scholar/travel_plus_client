import { FormMap, MapProvider } from "@/components/map/map";

export default function Planner () {
    return <div className="planner">
        <MapProvider>
            <FormMap />
        </MapProvider>
    </div>
}