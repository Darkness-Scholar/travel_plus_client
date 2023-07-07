// import { gql } from "@apollo/client"
import Header from '@/components/planner/editor/header'
import Body from '@/components/planner/editor/body'

type Repo = {
    name: string
    age: number
}

// let query = gql`
//     query GetPlannerDetail($plannerID: ID) {
//         getPlannerDetail(id: $plannerID) {
//       
//         }
// }`

export default async function PlanEditor() {

    return <div className="page-plan-editor bg-white overflow-hidden">
        <Header />
        <Body />
    </div>
}