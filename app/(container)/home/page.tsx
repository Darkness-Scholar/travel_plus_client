import Header from "@/components/header"
import WeatherForecast from "@/components/home/weather_forecast"
import WeatherViewer from "@/components/home/weather_viewer"
import { getClient } from "@/lib/graphql"
import { gql } from "@apollo/client"
import weatherInfo from "@/services/weather.service"
import { IWeather, IWeeklyWeather } from "@/types/weather.type"

export default async function Home() {


    const GET_STH = gql`
        query GetPing {
            getPing {
                msg
                status
            }
        }
    `;

    const { data } = await getClient().query({ query: GET_STH });

    console.log(data)

    let weeklyWeather = await weatherInfo({
        feature: "forecast",
        q: "auto:ip",
        days: 7
    }) as IWeeklyWeather

    // console.log(weeklyWeather)

    return <main style={{
        backgroundImage: `url(/images/bg2.png)`
    }} className="bg-cover bg-center w-screen h-screen scrollbar-thin overflow-x-hidden pb-8">
        <Header />
        <div className="relative pt-[2rem] px-[2rem] lg:px-[7.6rem]">
            <div className="user">
                <p className="text-white text-xl">Welcome back,</p>
                <h1 className="text-white text-4xl font-semibold">Michelle</h1>
            </div>

            <div className="flex flex-col lg:flex-row justify-between">
                <WeatherViewer weeklyWeather={weeklyWeather} />

                <WeatherForecast weeklyWeather={weeklyWeather} />
            </div>
        </div>


    </main>
}