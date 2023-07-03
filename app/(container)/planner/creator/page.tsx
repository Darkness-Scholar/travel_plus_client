export default function PlannerCreator() {
    return <div className="overflow-hidden page-planner-creator bg-gradient-to-r from-gray-300 to-gray-100 w-full h-screen py-[4rem] px-[8rem]">
        <div className="relative w-full h-full drop-shadow-xl">
            <img src="/images/bg3.jpg" className="rounded-lg h-full" alt="" />
            <div className="absolute top-2 left-8">
                <img src="/logo-white.svg" alt="" className="w-24 h-16" />
            </div>
            <div className="absolute bottom-0 p-8">
                <button className="rounded-xl mb-4 text-sm bg-white px-4 font-semibold py-1 text-black">Nhật Bản</button>
                <h1 className="text-4xl font-bold drop-shadow-xl">Kiyomizu dera</h1>
                <h1 className="text-4xl font-bold drop-shadow-xl">Temple</h1>
                <div className="w-full mt-4 bg-white bg-opacity-20 rounded-xl p-2 drop-shadow-xl">
                    <div className="w-full h-24 space-x-12 px-8 rounded-lg flex items-center bg-white bg-opacity-40">
                        <div>
                            <small className="text-gray-100 text-sm">Location</small>
                            <p className="font-semibold text-gray-300">Kyoto, Japan</p>
                        </div>
                        <div>
                            <small className="text-gray-100 text-sm">Popularitas</small>
                            <p className="font-semibold text-gray-300">⭐ 4.9 (32 review)</p>
                        </div>
                        <div>
                            <button className="bg-sky-500 rounded-lg px-4 py-2">Let's go</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute overflow-y-auto scrollbar-none p-8 drop-shadow-xl top-0 right-0 w-[28rem] rounded-lg bg-gray-100 h-full">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                        <p className="text-base font-semibold selected">Nổi tiếng</p>
                        <p className="text-base text-gray-300 font-semibold">Phổ biến</p>
                        <p className="text-base text-gray-300 font-semibold">Mới nhất</p>
                    </div>
                    <div className="flex space-x-2">
                        <div className="w-8 h-8 rounded-full bg-red-500"></div>
                    </div>
                </div>
                <h1 className="mt-10 text-4xl font-bold text-black">Hello <span className="text-sky-600">TùngDZ</span></h1>
                <p className="text-gray-600">Bạn muốn đi đâu nhỉ?</p>
                <div className="mt-6 flex space-x-3">
                    <p className="text-sm text-red-500">Phong cảnh</p>
                    <p className="text-sm text-gray-400">Cắm trại</p>
                    <p className="text-sm text-gray-400">Bơi lội</p>
                    <p className="text-sm text-gray-400">Thám hiểm</p>
                </div>
                <div className="mt-4 flex space-x-2">
                    <div style={{ backgroundImage: "url(https://image.nhandan.vn/w800/Uploaded/2023/igpcvcvjntc8510/2023_02_08/trang-an-5882.jpg)" }}
                        className="border-xl drop-shadow-xl bg-cover w-[8rem] h-[10rem] bg-red-500 rounded-xl" />

                    <div style={{ backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/7/79/Thap_Rua.jpg)" }}
                        className="border-xl drop-shadow-xl bg-cover w-[8rem] h-[10rem] bg-red-500 rounded-xl" />

                    <div style={{ backgroundImage: "url(https://ak-d.tripcdn.com/images/0106e120009i6d2b3DB07.jpg)" }}
                        className="border-xl drop-shadow-xl bg-cover w-[8rem] h-[10rem] bg-red-500 rounded-xl" />
                </div>


                <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-600">
                        Popular categories
                    </p>
                    <small className="text-red-400">See more</small>
                </div>

                <div className="flex mt-4 space-x-2 items-center">
                    <div className="w-[5rem] h-[6rem] rounded-xl bg-orange-300">

                    </div>
                    <div className="w-[5rem] h-[6rem] rounded-xl bg-orange-300">

                    </div>
                    <div className="w-[5rem] h-[6rem] rounded-xl bg-orange-300">

                    </div>
                    
                    <div className="w-[5rem] h-[6rem] rounded-xl bg-orange-300">

                    </div>
                    <div className="w-[5rem] h-[6rem] rounded-xl bg-orange-300">

                    </div>
                </div>

            </div>
        </div>
    </div>
}