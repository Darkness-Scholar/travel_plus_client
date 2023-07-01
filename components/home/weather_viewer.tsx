'use client'
import React from "react"
import { IWeather, IWeeklyWeather } from "@/types/weather.type"

interface IWeatherViewer extends React.HTMLAttributes<HTMLDivElement> {
    weeklyWeather: IWeeklyWeather
}

const WeatherViewer: React.FC<IWeatherViewer> = ({ weeklyWeather, ...rest }) => {


    return <div {...rest}>
        <div className="mt-6 rounded-lg w-full lg:w-[33rem] weather-info bg-blur bg-white bg-opacity-60">
            <div className="flex justify-between items-center pr-4">
                <h2 className="p-6 text-lg font-semibold text-black">
                    {weeklyWeather.location.name}, {weeklyWeather.location.country}
                </h2>
                <img src={weeklyWeather.forecast.forecastday[0].day.condition.icon} alt="" />
            </div>
            <img src={"/shapes/weather01.svg"} className="w-full" />
            <div className="w-full p-6">
                <div className="hidden lg:flex space-x-4 justify-between text-gray-800">
                    <p>0am</p>
                    <p>6am</p>
                    <p>9am</p>
                    <p>12am</p>
                    <p>15pm</p>
                    <p>18pm</p>
                    <p>21pm</p>
                </div>
                <div className="menu flex space-x-2 mt-4">
                    <button className="text-sm text-gray-400 bg-gray-100 rounded-lg px-3 py-1">Hourly</button>
                    <button className="text-sm bg-sky-500 rounded-lg px-3 py-1">Weekly</button>
                </div>
                <div className="mt-4 flex space-x-3 justify-between items-center px-2 overflow-x-auto">

                    {weeklyWeather.forecast.forecastday.map((item: IWeather, index) => {
                        let date = new Date(item.date)
                        let dayOfWeek = date.getDay()
                        let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
                        let dayName = daysOfWeek[dayOfWeek]
                        return <div key={Math.random() * 123123123} className="flex flex-col space-y-3 items-center justify-center">
                            <p className="text-black font-semibold">{dayName}</p>
                            <img src={item.day.condition.icon} alt="" className="w-10 h-8 lg:h-10" />
                            <p className="text-xs text-black font-semibold">
                                {item.day.maxtemp_c}°
                                <small className="text-gray-500"> {item.day.mintemp_c}°</small>
                            </p>
                        </div>
                    })}
                </div>
            </div>
        </div>
        <div className="flex mt-4 w-full justify-between space-x-4">
            <div className="w-full flex flex-col items-center justify-center space-y-3 rounded-lg weather-info bg-blur bg-white bg-opacity-60 p-4">
                <h1>Tokyo, Japan</h1>
                <img src="/icons/weather/rainy.svg" className="w-14" alt="weather" />
                <p className="text-xs text-black font-semibold">
                    CC°
                    <small className="text-gray-500"> CC°</small>
                </p>
            </div>

            <div className="w-full flex flex-col items-center justify-center space-y-3 rounded-lg weather-info bg-blur bg-white bg-opacity-60 p-4">
                <h1>Tokyo, Japan</h1>
                <img src="/icons/weather/rainy.svg" className="w-14" alt="weather" />
                <p className="text-xs text-black font-semibold">
                    CC°
                    <small className="text-gray-500"> CC°</small>
                </p>
            </div>

            <div className="w-full flex flex-col items-center justify-center space-y-3 rounded-lg weather-info bg-blur bg-white bg-opacity-60 p-4">
                <h1>Tokyo, Japan</h1>
                <img src="/icons/weather/rainy.svg" className="w-14" alt="weather" />
                <p className="text-xs text-black font-semibold">
                    CC°
                    <small className="text-gray-500"> CC°</small>
                </p>
            </div>
        </div>
    </div>
}

export default WeatherViewer