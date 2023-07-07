"use client"
import { Drawer, Input } from "antd"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import BoardProvider from "./board/provider"
import BoardContainer from "./board/container"

const Body: React.FC<any> = () => {

    const [open, setOpen] = useState<boolean>(false)
    const route = useRouter()
    const params = useParams()

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return <div className="relative flex">

        <button onClick={showDrawer} className="space-x-2 px-4 py-2 flex items-center vertical-text fixed right-0 top-1/2 text-black rounded-t-xl bg-gradient-to-r from-orange-400 to-orange-600">
            <img className="w-5 h-5" src="/icons/ai.svg" alt="" />
            <p className="font-semibold text-white">AI Support</p>
        </button>

        <Drawer title="AI Support (Building)" placement="right" onClose={onClose} open={open}>
            <div className="space-y-2 border-lg rounded-lg p-4 text-black">
                <p className="font-semibold">Hi! Here some our limitations:</p>
                
                <p className="text-gray-700">❌ May occasionally generate incorrect information.</p>
                <p className="text-gray-700">❌ May occasionally produce harmful instructions or biased content.</p>
                <p className="text-gray-700">❌ Limited knowledge of world and events after 2021.</p>
            </div>

            <div className="mt-3 text-black flex flex-col space-y-2">
                <p className="font-semibold">Here are some suggestion (choose one):</p>
                <p className="px-4 border-md py-2 rounded-xl bg-gray-200">How long do you intend to stay at your destination?</p>
                <p className="px-4 border-md py-2 rounded-xl bg-gray-200">What is your desired destination for your next trip?</p>
                <p className="px-4 border-md py-2 rounded-xl bg-gray-200">What is your budget for this trip?</p>
            </div>

            <div className="mt-2">
                <Input.TextArea style={{ resize: 'none' }} rows={3} placeholder="Ask me any question"/>
                <button className="mt-2 w-full bg-sky-500 rounded-lg py-2">Send</button>
            </div>

        </Drawer>
        <div className="trip-date pl-8 py-4 w-[15%]">
            <p className='text-black text-lg font-semibold'>Start date</p>
            <button className="mr-4 px-4 py-1 border-[0.4px] bg-gray-200 rounded-md border-solid border-gray-300 text-gray-600">
                Jul 08, 2023
            </button>

            <div className="dates flex flex-col mt-6 w-full">
                <div className="date-selected border-orange-500 border-solid border-l-[2px] bg-gray-100 px-6 py-4">
                    <p className="float-right text-black text-lg font-semibold">Jul 08</p>
                </div>

                <div className="date-selected px-6 py-4">
                    <p className="float-right text-black text-lg font-semibold">Jul 09</p>
                </div>

                <div className="date-selected px-6 py-4">
                    <p className="float-right text-black text-lg font-semibold">Jul 10</p>
                </div>
            </div>

        </div>
        <div className='w-[85%] px-10 py-4 bg-gray-100 max-h-[90vh]'>
            <div className="h-[10vh] mt-4 flex items-center justify-center space-x-12">
                <p className="text-lg font-bold text-red-500">123.000 VND</p>
                <p onClick={() => route.push(`/planner/${params.id}/map`)} className="cursor-pointer text-md font-bold text-orange-500">MAP VIEW</p>
            </div>
        </div>
        <BoardProvider>
            <BoardContainer />
        </BoardProvider>
    </div>
}

export default Body