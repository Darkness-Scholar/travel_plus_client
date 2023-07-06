"use client"
import { useRouter, useParams } from "next/navigation"

const Body: React.FC<any> = () => {

    const route = useRouter()
    const params = useParams()

    console.log(params)

    return <div className="flex">
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
                <p onClick={()=>route.push(`/planner/${params.id}/map`)} className="cursor-pointer text-md font-bold text-orange-500">MAP VIEW</p>
            </div>
            <div className="hidden mt-6 h-[75vh] pb-4 overflow-y-auto scrollbar-thin">
                
            </div>
        </div>

        <div className="w-[55%] bg-white">
            
        </div>
    </div>
}

export default Body