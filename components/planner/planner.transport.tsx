"use client"

import { ITransport } from "@/types/planner.type"

interface TransportProps extends React.HTMLAttributes<HTMLDivElement> {
    data?: ITransport
}

const Transport: React.FC<TransportProps> = ({ data, ...rest }) => {

    return <div className="px-8">
        {
            data ? <div className="shadow-xl">
                <div className="ticket-header flex items-center space-x-3 rounded-t-xl bg-[#846075] px-6 py-2">
                    <img src="/icons/plane.svg" alt="" />
                    <p className="text-base font-semibold text-white">Plane ticket</p>
                </div>

                <div className="ticket-content flex px-12 py-4">
                    <div className="flex space-x-6 pr-6">
                        <div className="flex flex-col space-y-5">
                            <div>
                                <p className="text-2xl font-bold">HAN</p>
                                <h1>{data.from}</h1>
                            </div>
                            <div>
                                <p className="text-gray-400 text-base font-semibold">{data.departure_time.toDateString()}</p>
                                <h2 className="text-2xl font-bold">
                                    {data.departure_time.getHours()}:
                                    {data.departure_time.getMinutes()}
                                    {data.departure_time.getHours() > 12 ? " PM" : " AM"}
                                </h2>
                                <p className="text-gray-600">Departure Time</p>
                            </div>
                        </div>

                        <div className="relative pt-4 flex justify-center">
                            <div className="w-32 h-[1px] bg-[#846075]" />
                            <div className="absolute z-[2] bg-white rounded-xl px-4 top-1 border-[#846075] border-solid border-[1px]">2hr</div>
                        </div>

                        <div className="flex flex-col space-y-5">
                            <div>
                                <p className="text-2xl font-bold">SGN</p>
                                <h1>{data.to}</h1>
                            </div>
                            <div>
                                <p className="text-gray-400 text-base font-semibold">{data.arrival_time.toDateString()}</p>
                                <h2 className="text-2xl font-bold">
                                    {data.arrival_time.getHours()}:
                                    {data.arrival_time.getMinutes()}
                                    {data.arrival_time.getHours() > 12 ? " PM" : " AM"}
                                </h2>
                                <p className="text-gray-600">Arrival Time</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-solid border-l-[2px] border-gray-400 px-6">
                        <p className="text-2xl font-bold">{data.id}</p>
                        <span className="text-sm text-gray-500">Flight No.</span>
                        <p>Note:</p>
                        <p className="text-gray-500 max-w-[10rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit, sit amet</p>
                    </div>
                </div>

                <div className="ticket-header h-7 w-full rounded-b-xl bg-[#846075] px-6 py-1">
                </div>
            </div> : <div>
                <div className="py-8 border-[2px] border-[#C4C4C4] flex flex-col items-center justify-center rounded-md border-solid bg-[#E0E0E0]">
                    <h2 className="text-lg font-semibold">Không có vé được đặt</h2>
                    <p>Nhấn vào nút bên dưới để tìm và đặt vé xe, máy bay,...</p>
                    <button className="mt-3 text-base font-semibold border-[2px] border-[#C4C4C4] border-solid px-8 py-2 rounded-lg">Tìm và đặt vé</button>
                </div>
            </div>
        }
    </div>
}

export default Transport