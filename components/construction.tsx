"use client"
import { useState } from "react"

export default function Construction() {

    const [showModal, setShowModal] = useState(true)

    return <>
        {
            showModal && <div className="z-[999] flex items-center justify-center w-screen h-screen bg-black bg-opacity-25 top-0 left-0 fixed">
                <div className="relative bg-white rounded-xl p-6 flex flex-col justify-center items-center">
                    <div onClick={() => setShowModal(false)} className="cursor-pointer absolute top-3 right-3 float-right w-4 h-4 rounded-full bg-red-500"></div>
                    <img src="/images/construction.png" alt="" className="" />
                    <p className="text-black">Công trường đang xây dựng, vui lòng đi lối khác</p>
                </div>
            </div>
        }
    </>
}