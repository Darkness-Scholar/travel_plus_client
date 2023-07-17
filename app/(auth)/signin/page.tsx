"use client"
import Link from 'next/link'
import React, { useRef } from 'react'
import { IParallax } from '@react-spring/parallax'
import Image from 'next/image'
import SigninContainer from '@/components/signin'

export default async function Signin() {

    const parallax = useRef<IParallax>(null!)

    return <main className='signin_page'>
        <SigninContainer />
    </main>
}
