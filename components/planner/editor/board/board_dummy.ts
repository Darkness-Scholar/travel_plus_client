
export type Row = {
    type: string
    _id: string
    name: string
    description: string
}

export type ColumnType = {
    type: string
    _id: string
    date: string
    activities: Array<Row>
}

const board_dummy: Array<ColumnType> = [
    {
        type: "column",
        _id: "1",
        date: "02/07/2023",
        activities: [
            {
                type: "row",
                _id: "1_01",
                name: "Activity 1",
                description: "Activity description"
            },
            {
                type: "row",
                _id: "1_02",
                name: "Activity 2",
                description: "Activity description"
            }
        ]
    },
    {
        type: "column",
        _id: "2",
        date: "03/07/2023",
        activities: [
            {
                type: "row",
                _id: "2_01",
                name: "Activity 3",
                description: "Activity description"
            },
            {
                type: "row",
                _id: "2_02",
                name: "Activity 4",
                description: "Activity description"
            }
        ]
    },
    {
        type: "column",
        _id: "3",
        date: "04/07/2023",
        activities: [
            {
                type: "row",
                _id: "3_01",
                name: "Activity 5",
                description: "Activity description"
            },
            {
                type: "row",
                _id: "3_02",
                name: "Activity 6",
                description: "Activity description"
            },
            {
                type: "row",
                _id: "3_03",
                name: "Activity 7",
                description: "Activity description"
            },
            {
                type: "row",
                _id: "3_04",
                name: "Activity 8",
                description: "Activity description"
            }
        ]
    }
]

export default board_dummy