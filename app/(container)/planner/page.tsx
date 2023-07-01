import PlannerController from "@/components/planner/planner.controller";
import Header from "./header";
import ListPlanner from "@/components/planner/planner.list";

export default function Planner () {
    return <div className="page-planner bg-[#EEF2F6]">
        <Header />
        <div className="w-full bg-[#846075]">
            <div className="pt-32 pb-10 px-[2rem] lg:px-[8rem] flex items-center justify-between">
                <div className="txt-group">
                    <h3 className="text-4xl font-bold">Travel Planner</h3>
                    <p>Put together a trip wishlist to create a detailed itinerary.</p>
                </div>
                <img src="/images/planner-banner.svg" alt="" />
            </div>
        </div>
        <div className="py-[2rem] px-[2rem] lg:px-[7.6rem] w-full flex space-x-12">
            <PlannerController />
            <ListPlanner />
        </div>
    </div>
}