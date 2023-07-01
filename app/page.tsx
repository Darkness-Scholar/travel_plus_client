import Landing from '@/components/landing'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

  return <main className='relative w-screen h-screen bg-cover bg-center' style={{ backgroundImage: 'url(/bg1.png)' }}>
    <Landing />
  </main>
}
