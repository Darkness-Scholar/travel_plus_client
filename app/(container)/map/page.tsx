import Construction from "@/components/construction";
import Header from "@/components/header";
import MapView from "@/components/map";
import MapPlace from "@/components/map/map.place";
import MapProvider from "@/contexts/map.context";
import { places_dummy } from "@/dummy/places.dummy";

export default function Map() {
    return <MapProvider>
        <Construction />
        <div className="relative w-screen h-screen overflow-hidden bg-white">
            <Header />

            <div className="absolute z-[2] w-[22%] h-full top-0 left-0 bg-white pt-32">
                <div className="map-search-input w-full px-6">
                    <div className="bg-[#EFEFEF] rounded-lg shadow-lg map-input flex px-3 py-2 items-center space-x-3">
                        <img src="/icons/map/search.svg" alt="" className="w-4 h-4" />
                        <input type="text" placeholder="Enter a place" className="text-sm text-gray-600 bg-[#EFEFEF] outline-none border-none" />
                    </div>
                </div>
                <div className="map-places h-full w-full mt-2 p-4">
                    <div className="w-full h-full border-2 rounded-lg">
                        <div className="hidden px-1 drop-shadow-md">
                            <button className="rounded-tl-xl p-2 bg-white text-black w-full">Ẩm thực</button>
                            <button className="rounded-tr-xl p-2 bg-[#EFEFEF] text-black w-full">Ẩm thực</button>
                        </div>
                        <div className="flex flex-col space-y-4 overflow-y-auto scrollbar-thin w-full h-full px-4 py-3 rounded-xl shadow-2xl text-black">

                            {places_dummy.map(item => <MapPlace name={item.name}
                                key={Math.random() * 123123123123}
                                // @ts-ignore
                                icons={item.icons}
                                owner={item.owner}
                                description={item.description}
                                rate={item.rate}
                                lines={item.lines}
                            />)}

                        </div>
                    </div>
                </div>
            </div>

            <MapView />
        </div>
    </MapProvider>
}
