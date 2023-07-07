export type Status = {status:string, icon:string, color:string}

export const statuses: Array<Status> = [
    {
        status: "open",
        icon: "⚡",
        color: "#EB5A46"
    },
    {
        status: "done",
        icon: "👌",
        color: "#3981DE"
    }
]

export type Record = {id:number, icon:string, status:string, title:string, content:string}
export const data: Array<Record> = [
    {
        id: 1,
        icon: "⚡",
        status: "open",
        title: "Item title 1",
        content: "Item content 1"
    }, {
        id: 2,
        icon: "⚡",
        status: "open",
        title: "Item title 2",
        content: "Item content 2"
    }, {
        id: 3,
        icon: "⚡",
        status: "open",
        title: "Item title 3",
        content: "Item content 3"
    }, {
        id: 4,
        icon: "⚡",
        status: "open",
        title: "Item title 4",
        content: "Item content 4"
    }, {
        id: 5,
        icon: "👌",
        status: "done",
        title: "Item title 5",
        content: "Item content 5"
    }, {
        id: 6,
        icon: "👌",
        status: "done",
        title: "Item title 6",
        content: "Item content 6"
    },
]