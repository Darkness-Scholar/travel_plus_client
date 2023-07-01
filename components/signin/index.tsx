"use client"
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { login } from "@/store/auth.slice"
import { useRouter } from 'next/navigation'
import SigninForm from './form'

export default function SigninContainer() {
    
    const dispatch = useDispatch()
    const router = useRouter()

    return <>
        <div className="absolute signin_page_container w-screen h-screen" style={{ backgroundImage: 'url(/images/bg.jpg)' }}>
            <div id="scene">
                <div className="layer">
                    <img src={"/images/moon.png"} />
                </div>
                <div className="layer">
                    <img src={"/images/mountains02.png"} />
                </div>
                <div className="layer">
                    <img src={"/images/mountains01.png"} />
                </div>
                <div className="layer">
                    <img src={"/images/road.png"} />
                </div>
            </div>
        </div>
        <SigninForm />
    </>
}