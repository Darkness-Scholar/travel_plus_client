"use client"

import { useMutation, gql } from "@apollo/client"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next"
import { Modal, Form, Input, Select, Button } from "antd"
import { useState } from "react"

interface IPlannerController extends React.HTMLAttributes<HTMLDivElement> {

}

const CREATE_PLANNER = gql`
mutation Mutation($createPlanInput: CreatePlanInput!) {
    createPlan(createPlanInput: $createPlanInput) {
      data {
        id
        title
      }
    }
  }
`

const PlannerController: React.FC<IPlannerController> = ({ ...rest }) => {

    let token = getCookie("token") as string
    const [isShowModal, setIsShowModal] = useState<boolean>(false)
    const route = useRouter()
    const show = () => setIsShowModal(true)
    const hidden = () => setIsShowModal(false)

    const [mutation, { loading }] = useMutation(CREATE_PLANNER)

    const createPlanner = async (values: { title: string, categories: string | string[], description: string }) => {
        try {
            let { data: req } = await mutation({
                variables: {
                    createPlanInput: { title: values.title, description: values.description }
                }
            }); hidden()

            route.push(`/planner/${req.createPlan.data.id}`)

        } catch (err) {
            console.log(err)
        }
    }
    return <div {...rest} className="">

        <Modal centered width={"60%"} className="planner-creator" open={isShowModal} onCancel={hidden} footer={null} closable={false}>
            <div className="flex mb-2 w-full justify-between items-center">
                <p className="text-xl font-semibold">Plan Creator</p>
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
            </div>
            <div className="flex space-x-6">
                <img src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80" alt="" className="drop-shadow-xl w-[20rem] h-[26rem] rounded-xl" />
                <Form onFinish={createPlanner} className="w-full" layout="vertical">
                    <Form.Item name={"title"} required label={<p className="font-semibold">Title</p>}>
                        <Input className="w-full" />
                    </Form.Item>
                    <Form.Item name={"categories"} label={<p className="font-semibold">Categories</p>}>
                        <Select className="w-full" >
                            <Select.Option key={"categories.item1"}>Category 1</Select.Option>
                            <Select.Option key={"categories.item2"}>Category 2</Select.Option>
                            <Select.Option key={"categories.item3"}>Category 3</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name={"description"} label={<p className="font-semibold">Description</p>}>
                        <Input.TextArea className="w-full" style={{ resize: "none" }} rows={6} />
                    </Form.Item>
                    <div className="flex space-x-4">
                        <button className="px-6 py-2 drop-shadow-xl rounded-lg bg-red-500 hover:bg-red-400 text-gray-100 font-semmibold">Cancel</button>
                        <button type="submit" className="px-6 py-2 drop-shadow-xl rounded-lg bg-sky-500 hover:bg-sky-400 text-gray-100 font-semmibold">Save and continue</button>
                    </div>
                </Form>
            </div>
        </Modal>

        <div className="buttons flex flex-col space-y-4">
            <button onClick={show} className="bg-[#846075] px-12 py-2 rounded-lg w-52">
                Create Plan
            </button>

            <button className="bg-white text-black px-12 py-2 rounded-lg w-52 flex justify-between items-center space-x-2">
                <img src="/icons/food.svg" alt="" />
                <span>Restaurants</span>
            </button>


            <p className="text-gray-600 text-lg">Tags</p>

            <div className="flex flex-col space-y-2 pl-1 text-gray-500">

                <p className="font-semibold">Ăn uống</p>
                <p className="font-semibold">Vui chơi</p>
                <p className="font-semibold">Việt Nam</p>
                <p className="font-semibold">Tắm bùn</p>
                <p className="font-semibold">Kì quan</p>
            </div>
        </div>
    </div>
}

export default PlannerController