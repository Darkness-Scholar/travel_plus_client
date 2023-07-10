
export type Row = {
    _id: string
    name: string
    description: string
}

export type Column = {
    _id: string
    date: string
    activities: Array<Row>
}

const board_dummy: Array<Column> = [
    {
        _id: "1",
        date: "02/07/2023",
        activities: [
            {
                _id: "1",
                name: "Activity name",
                description: "Activity description"
            },
            {
                _id: "2",
                name: "Activity name",
                description: "Activity description"
            }
        ]
    }
]

export default board_dummy