import axios from "axios"

const WEATHER_API_KEY = '21ca82a109b1428e82a125959231106'

type weatherInfoParams = {
    feature: 'current' | 'forecast' | 'search' | 'history' | 'marine' | 'future' | 'timezone' | 'sports' | 'astronomy' | 'ip'
    q: string
    days?: number
    hour?: number
}

/**
 * @param {string} q
 * Query parameter based on which data is sent back. It could be following:
    Latitude and Longitude (Decimal degree) e.g: q=48.8567,2.3508
    city name e.g.: q=Paris
    US zip e.g.: q=10001
    UK postcode e.g: q=SW1
    auto:ip IP lookup e.g: q=auto:ip
    IP address (IPv4 and IPv6 supported) e.g: q=100.0.0.1
*/

/**
 * @param {number} days
 * Number of days of forecast required.
    days parameter value ranges between 1 and 14. e.g: days=5
    If no days parameter is provided then only today's weather is returned.
*/

/**
 * @param {number} hour
 * Must be in 24 hour. For example 5 pm should be hour=17, 6 am as hour=6
*/

async function weatherInfo({ feature, q, days, hour }: weatherInfoParams) {
    try {
        let { data } = await axios
            .get(`http://api.weatherapi.com/v1/${feature}.json?key=${WEATHER_API_KEY}&aqi=no`, {
                params: { q, days }
            })
        return data
    } catch (err) {
        return err
    }
}

export default weatherInfo