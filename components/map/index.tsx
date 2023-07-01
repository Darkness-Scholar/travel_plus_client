"use client"
import { useMap } from "@/contexts/map.context"

export default function Map() {

  const { mapContainer } = useMap()

  return <div ref={mapContainer} className="w-full h-full" />
}