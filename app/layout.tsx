"use client"

import './globals.css'
import { ApolloWrapper } from '@/contexts/apollo'
import { Roboto_Slab } from 'next/font/google'
import { Provider } from 'react-redux'
import store from '@/store/store'

const inter = Roboto_Slab({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ApolloWrapper>
            {children}
          </ApolloWrapper>
        </Provider>
      </body>
    </html>
  )
}
