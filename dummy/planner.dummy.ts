import random from "@/helpers/random";
import IPlanner from "@/types/planner.type";


const planners_dummy: Array<IPlanner> = [
    {
        id: random(),
        transport: {
            id: 'MH370',
            type: 'plane',
            from: 'HaNoi, VietNam',
            to: 'HoChiMinh, VietNam',
            departure_time: new Date("Sun Jun 25 2023 12:30:00"),
            arrival_time: new Date("Sun Jun 25 2023 14:30:00")
        },
        time: "13 minutes",
        likes: ["maria", "jerry", "tom", "ashe", "garen"],
        title: "Planner 1",
        description: "Lorum Rhinos dotted the country's plateaus and he regularly witnessed herds of elephants trundling across the Luangwa Valley. Today, just a handful of elephants...",
        comments: [
            { owner: "jerry", content: "App nay hay do" },
            { owner: "tom", content: "Toi rat thich" }
        ],
        tags: ["Food", "Ha Noi", "Viet Nam"]
    },
    {
        id: random(),
        time: "24 minutes",
        transport: null,
        likes: ["maria", "jerry", "tom", "ashe", "garen"],
        title: "Planner 2",
        description: "Lorum Rhinos dotted the country's plateaus and he regularly witnessed herds of elephants trundling across the Luangwa Valley. Today, just a handful of elephants...",
        comments: [
            { owner: "jerry", content: "App nay hay do" },
            { owner: "tom", content: "Toi rat thich" }
        ],
        tags: ["Food", "Hai Phong", "Viet Nam"]
    },
    {
        id: random(),
        transport: null,
        time: "28 minutes",
        likes: ["maria", "jerry", "tom", "ashe", "garen"],
        title: "Planner 3",
        description: "Lorum Rhinos dotted the country's plateaus and he regularly witnessed herds of elephants trundling across the Luangwa Valley. Today, just a handful of elephants...",
        comments: [
            { owner: "jerry", content: "App nay hay do" },
            { owner: "tom", content: "Toi rat thich" },
            { owner: "ashe", content: "Kha thu vi" },
        ],
        tags: ["Food", "Hai Phong", "Viet Nam"]
    }
]

export default planners_dummy