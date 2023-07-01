"use client"
import planners_dummy from "@/dummy/planner.dummy"
import choose from "@/helpers/choose";
import random from "@/helpers/random";
import IPlanner, { ITransport } from "@/types/planner.type"
import { Input, Form } from "antd";
import { useState, useCallback, useMemo } from "react";
import Modal from "../modal";
import Transport from "./planner.transport";
import Itinerary from "./planner.itinerary";

interface IListPlanner extends React.HTMLAttributes<HTMLDivElement> {

}


// @ts-ignore
// Array.prototype.random = function () {
//     return this[Math.floor((Math.random() * this.length))];
// }

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string
    time: string
    likes: string[]
    title: string
    transport: ITransport
    description: string
    comments: Array<{ owner: string, content: string }>
    tags: string[]
}

let tagsColors = ["#FF7F27", "#FF0303", "#00FF34", "#4D32FF", "#FF2ECA"]

const Item: React.FC<ItemProps> = ({ id, transport, time, likes, title, description, comments, tags, ...rest }) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    let randomColor = useMemo(() => choose<string>(tagsColors), [tagsColors])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false)
    };

    const handleCancel = () => {
        console.log(`close`)
        setIsModalOpen(false);
    };

    return <div {...rest} className="cursor-pointer planner-item py-4 px-8">
        <div className="flex justify-between">
            <small className="text-gray-400">{time} ago</small>
            <div className="flex justify-between space-x-3">
                <div className="flex space-x-2 text-gray-400">
                    <img src="/icons/social/like.svg" alt="" />
                    <span>{likes.length}</span>
                </div>
                <div className="flex space-x-2 text-gray-400">
                    <img src="/icons/social/comment.svg" alt="" />
                    <span>{comments.length}</span>
                </div>
            </div>
        </div>
        <div className="mt-2">
            <p className="text-lg text-gray-500 font-semibold">{title}</p>
            <span className="text-sm text-gray-400">{description}</span>
        </div>
        <div className="tags flex space-x-2 mt-2">
            {tags.map(i => {
                // @ts-ignore
                return <button key={random()} style={{ backgroundColor: randomColor }} className="rounded-md py-1 bg-opacity-50 px-4 text-xs">
                    {i}
                </button>
            })}
        </div>
    </div>
}

const ListPlanner: React.FC<IListPlanner> = ({ ...rest }) => {

    const [planners, setPlanners] = useState<Array<IPlanner>>(planners_dummy)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalData, setModalData] = useState<IPlanner | null>()
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [form] = Form.useForm()

    const showModal = useCallback((data: IPlanner) => {
        console.log(data)
        setModalData(null)
        setModalData(data)
        setIsModalOpen(true);
    }, [planners])

    const handleOk = () => {

        let index = planners.findIndex(i => i.id === modalData.id)
        let { title, description } = form.getFieldsValue(["title", "description"])
        let newData: Array<IPlanner> = [...planners]
        newData[index].description = description
        newData[index].title = title
        setPlanners(newData)
        setIsModalOpen(false);
        setIsEditMode(false)
        setModalData(null)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsEditMode(false)
        setModalData(null)
    };


    return <div {...rest} className="rounded-xl bg-white w-full">
        {isModalOpen && <Modal title={modalData.title} contentList={{
            info: <p>{modalData.description}</p>,
            transport: <Transport 
                data={modalData.transport}/>,
            itinerary: <Itinerary />
        }} extra={<div className="flex items-center space-x-2">
            <button className="w-4 h-4 rounded-full bg-green-500" />
            <button onClick={handleCancel} className="w-4 h-4 rounded-full bg-red-500" />
        </div>} />
        }
        {planners_dummy.map(item => <Item key={item.id} {...item} onClick={() => showModal(item)} />)}
    </div>
}

export default ListPlanner