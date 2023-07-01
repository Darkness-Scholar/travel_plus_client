
export default interface IPlanner {
    transport: ITransport | null
    id: string
    time: string
    likes: string[]
    title: string
    description: string
    comments: Array<{ owner: string, content: string }>
    tags: string[]
}

export interface ITransport {
    type: "taxi" | "plane" | "bus"
    id: string
    from: string
    to: string
    departure_time: Date
    arrival_time: Date
}