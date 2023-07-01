"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import Construction from "./construction"


export default function Landing() {

    return <div className="cloud">

        <Construction />

        <header className='py-[2.66rem] px-[2rem] lg:px-[7.6rem] flex items-center space-x-3 lg:justify-between bg-gradient-to-b from-gray-500'>
            <Image src={'/icons/rectangles.svg'} alt='Hey' className='lg:hidden' width={33} height={33} />
            <div className="left flex space-x-12 items-center ">
                <Image src={'/logo-white.svg'} alt='Hey' width={160} height={40} />
                <div className="hidden lg:flex space-x-8">
                    <Link href="home" className="text-white font-semibold">Home</Link>
                    <Link href="map" className="text-white font-semibold">Travel Planner</Link>
                    <Link href="map" className="text-white font-semibold">Map</Link>
                </div>
            </div>

            <div className="hidden lg:flex space-x-4">
                <Link href="/signin" className='text-center border-sm w-24 rounded-2xl px-3 py-1 bg-gray-300 bg-opacity-30'>Sign In</Link>
                <Link href="/signup" className='text-center w-24 rounded-2xl px-3 py-1 bg-gray-400'>Sign Up</Link>
            </div>
        </header>
        <div className='py-[2.66rem] px-[2.3rem] lg:px-[7.6rem]'>
            <h1 className='text-xl font-semibold w-full lg:w-[28rem] text-gray-600'>
                Access live travel updates ✈️, discussion forum 💬,
                currency converter 💵,
                and more... all on Travel+.
            </h1>
            <button className='mt-4 h-12 rounded-xl px-6 py-1 bg-sky-500'>
                Get Started
            </button>
        </div>
    </div>
}