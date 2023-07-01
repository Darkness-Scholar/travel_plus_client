import React from "react"

export default interface Tour {
    name: string
    icons?: React.ReactNode[]
    description: string
    rate: number
    owner: string,
    lines: Array<number[]>
}