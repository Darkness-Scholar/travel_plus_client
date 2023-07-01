export interface IWeather {
    date: string
    day: {
        maxtemp_c: number
        mintemp_c: number
        avgtemp_c: number
        condition: {
            text: string
            icon: string
        }
        uv: number
    }
    astro: any
    hour: any
}

export interface IWeeklyWeather {
    location: any
    current: any
    forecast: {
        forecastday: Array<IWeather>
    }
}