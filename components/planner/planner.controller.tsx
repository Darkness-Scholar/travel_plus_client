"use client"

import { useMutation, gql } from "@apollo/client"
import { getCookie } from "cookies-next"

interface IPlannerController extends React.HTMLAttributes<HTMLDivElement> {

}

const CREATE_PLANNER = gql`
mutation CreatePlanner($values: CreatePlannerPayload) {
    createPlanner(values: $values) {
        title
        description
    }
  }
`

const PlannerController: React.FC<IPlannerController> = ({ ...rest }) => {
 
    let token = getCookie("token") as string

    const [mutation, { loading }] = useMutation(CREATE_PLANNER, { context: {
        headers: {
            "authorization": `Bearer ${token}`
        }
    } })

    const onClickCreatePlanner = async () => {
        try {
            let req = await mutation({
                variables: {
                    values: {
                        title: "Test_Create_Planner",
                        description: "Test Description Planner"
                    }
                }
            })

            console.log(req.data)
        } catch (err) {
            console.log(err)
        }
    }
    return <div {...rest} className="">
        <div className="buttons flex flex-col space-y-4">
            <button onClick={onClickCreatePlanner} className="bg-[#846075] px-12 py-2 rounded-lg w-52">
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