"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface IHeader extends React.HTMLAttributes<HTMLDivElement> {

}


//sdadasd

const Header: React.FC<IHeader> = ({ ...rest }) => {

    const [show, setShow] = useState<boolean>(false)

    const transition = () => {
        if (window.scrollY > 100) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    useEffect(() => {

        window.addEventListener("scroll", transition)
        return () => window.removeEventListener("scroll", transition)
    }, [])

    return <header className={`fixed ${show? "transition-header":"bg-none"} z-10 w-screen py-[2rem] px-[2rem] lg:px-[7.6rem] flex items-center space-x-3 lg:justify-between`}>
        <Image src={'/icons/rectangles.svg'} alt='Hey' className='lg:hidden' width={33} height={33} />
        <div className="left flex space-x-12 items-center ">
            <Image src={'/logo-white.svg'} alt='Hey' width={160} height={40} />
        </div>

        <div className="hidden lg:flex space-x-8 items-center">
            <Link href="/home" className="text-white font-semibold">Home</Link>
            <Link href="/advice" className="text-white font-semibold">Travel Advice</Link>
            <Link href="/community" className="text-white font-semibold">Community</Link>
            <Link href="/planner" className="text-white font-semibold">Travel Planner</Link>
            <Link href="/map" className="text-white font-semibold">Map</Link>
            <div className="flex space-x-1 items-center">
                <Image src={"/icons/woman.svg"} alt='woman.svg' width={36} height={36} />
                <Image src={"/icons/polygon.svg"} alt='polygon.svg' width={14} height={14} />
            </div>
        </div>
    </header>
}

export default Header