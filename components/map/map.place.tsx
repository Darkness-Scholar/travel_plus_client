"use client"
import React from "react"
import { useMap } from "@/contexts/map.context"

interface IMapPlace extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    icons: React.ReactNode[]
    description: string
    rate: number
    owner: string
    lines: Array<number[]>
}

const MapPlace: React.FC<IMapPlace> = ({ name, icons, description, rate, owner, lines, ...rest }) => {

    const { map, geojson, setLoading, loading } = useMap()

    const showLine = () => {

        setLoading(true)

        let src = map.current?.getSource('route')

        if (!src) {
            map.current?.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': lines
                    }
                }
            });

            map.current?.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#ff0000',
                    'line-width': 4
                }
            });
        } else {
            map.current?.removeLayer('route')
            map.current?.removeSource('route')

            map.current?.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': lines
                    }
                }
            });

            map.current?.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#ff0000',
                    'line-width': 4
                }
            });
        }

        map.current?.flyTo({
            center: [lines[0][0], lines[0][1]],
            essential: true
            });

        setLoading(false)

    }

    return <div onClick={showLine} className="cursor-pointer map-place-item border-b-2 pb-4">

        <div className="flex heading space-x-2 items-center justify-between">
            <p className="text-sm font-bold">{name}</p>
            <div className="flex space-x-2">
                {icons.map(item => item)}
            </div>
        </div>

        <p className="mt-1">{"⭐".repeat(rate)}</p>

        <p className="text-[0.9rem] text-gray-500 font-semibold">Creator:
            <span className="text-sky-500"> {owner}</span>
        </p>

        <p className="mt-1 text-gray-500 text-[0.8rem] font-semibold">
            {description}
        </p>

        <div className="flex mt-1 items-center space-x-3">
            <div className="flex space-x-2 items-center">
                <p className="text-gray-400 font-semibold text-sm">12k</p>
                <img src="icons/social/like.svg" className="w-4 h-4" />
            </div>

            <div className="flex space-x-2 items-center">
                <p className="text-gray-400 font-semibold text-sm">12k</p>
                <img src="icons/social/comment.svg" className="fill-slate-100 w-4 h-4" />
            </div>
        </div>

    </div >
}

export default MapPlace