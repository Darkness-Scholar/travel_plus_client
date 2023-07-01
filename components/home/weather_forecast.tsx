'use client'
import React from "react"
import { IWeather, IWeeklyWeather } from "@/types/weather.type"

interface IWeatherForecast extends React.HTMLAttributes<HTMLDivElement> {
    weeklyWeather: IWeeklyWeather
}

const WeatherForecast: React.FC<IWeatherForecast> = ({ weeklyWeather, ...rest }) => {

    const date = new Date(weeklyWeather.location.localtime);
    const timeString = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    console.log(timeString);

    return <div {...rest}>
        <h1 className="text-xl font-semibold text-gray-300">WEATHER FORECAST</h1>
        <div className="mt-2 rounded-xl bg-black bg-opacity-30 bg-blur p-2">
            <div className="heading px-5 pt-4 flex items-center justify-between">
                <img src="/icons/location.svg" alt="" />
                <p>{weeklyWeather.location.name}, {weeklyWeather.location.country}</p>
                <img src="/icons/dots.svg" alt="" />
            </div>

            <div className="current flex px-5 py-2 justify-between items-center">
                <img src={weeklyWeather.current.condition.icon} alt="" className="w-[4.4rem] h-[4.4rem]" />
                <div className="current-info flex flex-col items-end">
                    <p>{timeString}</p>
                    <h1 className="text-[2.2rem] font-semibold">{weeklyWeather.current.temp_c}°C</h1>
                    <div className="current-info flex flex-col items-end text-gray-200">
                        <p className="hidden lg:flex">{weeklyWeather.current.condition.text}</p>
                        <small>Feels like {weeklyWeather.current.feelslike_c}°C</small>
                    </div>
                </div>
            </div>
            <div className="menu flex space-x-4 px-6">
                <button className="text-base text-gray-400 py-1">Hourly</button>
                <button className="relative text-base text-white py-1 bordered-btn">Weekly</button>
            </div>
            <div className="mt-4 flex space-x-3 justify-between px-5 py-4 overflow-x-auto">

                {weeklyWeather.forecast.forecastday.map((item: IWeather, index) => {
                    let date = new Date(item.date)
                    let dayOfWeek = date.getDay()
                    let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
                    let dayName = daysOfWeek[dayOfWeek]
                    return <div key={Math.random() * 123123123} className="flex flex-col space-y-3 items-center justify-center">
                        <p className="text-white font-semibold">{dayName}</p>
                        <img src={item.day.condition.icon} alt="" className="w-10 h-8 lg:h-10" />
                        <p className="text-xs text-white font-semibold">
                            {item.day.maxtemp_c}°
                            <small className="text-gray-300"> {item.day.mintemp_c}°</small>
                        </p>
                    </div>
                })}
            </div>
            <img src="/shapes/weather02.svg" alt="" />
            <div className="weather_extend">
                <div className="weather_extend_item flex justify-between px-5 py-3 border-b-[1px] border-gray-500">
                    <div>
                        <small>02:03 PM</small>
                        <p>Hong Kong</p>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <img src="/icons/weather/cloudy.svg" alt="" />
                        <small className="hidden lg:flex">Cloudy</small>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <p>32.3°</p>
                        <small>24.2°</small>
                    </div>
                </div>
                <div className="weather_extend_item flex justify-between px-5 py-3 border-b-[1px] border-gray-500">
                    <div>
                        <small>02:03 PM</small>
                        <p>Hong Kong</p>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <img src="/icons/weather/cloudy.svg" alt="" />
                        <small className="hidden lg:flex">Cloudy</small>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <p>32.3°</p>
                        <small>24.2°</small>
                    </div>
                </div>
                <div className="weather_extend_item flex justify-between px-5 py-3 border-b-[1px] border-gray-500">
                    <div>
                        <small>02:03 PM</small>
                        <p>Hong Kong</p>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <img src="/icons/weather/cloudy.svg" alt="" />
                        <small className="hidden lg:flex">Cloudy</small>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <p>32.3°</p>
                        <small>24.2°</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default WeatherForecast