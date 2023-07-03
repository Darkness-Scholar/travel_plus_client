// import { gql } from "@apollo/client"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Header from './header'
import Body from './body'

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

export default async function PlanEditor({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    console.log(repo)

    return <div className="page-plan-editor bg-white">
        <Header />
        <Body />
    </div>
}

export const getServerSideProps: GetServerSideProps<{ repo: Repo }> = async (context) => {

    // const req = await getClient().query({ query, variables: {
    //     id:
    // } })

    return {
        props: {
            repo: {
                name: "Tung",
                age: 24
            }
        }
    }
}