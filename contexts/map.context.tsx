"use client"
import { useState, useRef, useEffect, useContext, createContext, use } from "react"
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoiZXhvdHJhaWxzIiwiYSI6ImNsODJnemJ5bTBweGgzd21rM3NkZHg1dTcifQ.Z5S3APmFZB4YZ19vEHlXwA';

const MapContext = createContext<{
  map?: any
  mapContainer?: any
  lng?: any
  lat?: any
  zoom?: any
  geojson?: any
  setGeojson?: any
  loading?: any
  setLoading?: any
}>({})

const MapProvider = ({ children }: { children: React.ReactNode }) => {

  const map = useRef<mapboxgl.Map>()
  const mapContainer = useRef<any>(null);
  const [lng, setLng] = useState(105.849998);
  const [lat, setLat] = useState(21.033333);
  const [zoom, setZoom] = useState(12);
  const [geojson, setGeojson] = useState<any>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      console.log(`Loaded map`)
    });

  });

  return <MapContext.Provider value={{ loading, setLoading, map, mapContainer, lng, lat, zoom, geojson, setGeojson }}>
    {children}
    {loading && <div className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-black bg-opacity-50">
    
    </div> }
   </MapContext.Provider>
}

export const useMap = () => useContext(MapContext)

export default MapProvider