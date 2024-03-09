import React, { Suspense } from 'react'
import { RockClimbing ,WeatherData} from '@/interface/interfce'
import { createServer } from '@/utils/supabase/server'
import CommentSections from './Comment'
import Loading from '@/app/loading'
import SavedRoute from './SavedRoute'

interface page {
    desc:string
  }
  
export default async function RockRoute({desc}:page) {
  
    const supabase = createServer()
    const {data:{user}} = await supabase.auth.getUser()
    const {data:rockdata}= await supabase.from('rocks').select('*').eq('id',desc)
    const {data:coords}= await supabase.from('rocks').select('lat,long').eq('id',desc).single()
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.long}&appid=${process.env.WEATHER_API_KEY}`)
    const weatherData:WeatherData = await res.json()
    const kelvinToFahrenheit = (kelvin: number): number => parseFloat(((kelvin - 273.15) * 9/5 + 32).toFixed(2));
    const kelvinToCelsius = (kelvin: number): number => Math.round((kelvin - 273.15) * 100) / 100;

  return (
    <div className="flex justify-center p-8 bg-gray-100 min-h-screen">
 <div className="max-w-4xl w-full p-12 pt-12 bg-white rounded-lg shadow-lg">
  
    <h1 className="text-7xl font-bold text-gray-900">Climbing Routes</h1>
    {user ? (
          <SavedRoute desc={desc} />
        ) : (
          <p className="text-base text-gray-600 p-3">Please log in to save routes.</p>
        )}
   
    {rockdata?.map((data: RockClimbing, index) => {
      return (
        <div key={index} className="space-y-6">
          <div className=' p-3'>
          <div className="text-2xl font-bold text-gray-800">{data.place}</div>
          <div className="text-lg text-gray-700">{data.description} Grade: {data.grade}</div>
          </div>
          <div className=' flex items-center'>
          <h2 className="text-xl font-bold text-gray-700 p-2 ">Weather Forecast</h2>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
            </svg>
          </div>
          {weatherData.weather.map((forecast, index) => (
            <div key={index} className="text-base text-gray-600">
              Main: {forecast.main}
            </div>
          ))}
          <div className="text-base text-gray-600">
            Temperature: {kelvinToCelsius(weatherData?.main.temp || 0)}°C / {kelvinToFahrenheit(weatherData?.main.temp || 0)}°F
            <br />
            Min Temp: {kelvinToCelsius(weatherData?.main.temp_min || 0)}°C / {kelvinToFahrenheit(weatherData?.main.temp_min || 0)}°F,
            <br/> 
            Max Temp: {kelvinToCelsius(weatherData?.main.temp_max || 0)}°C / {kelvinToFahrenheit(weatherData?.main.temp_max || 0)}°F
            <br />
            Wind Speed: {weatherData.wind.speed} m/s
          </div>
        </div>
      );
    })}
    <div className="border-t border-black my-6"></div>
    <Suspense fallback={<Loading />}>
      <CommentSections desc={desc} />
    </Suspense>
 </div>
</div>



  
  )
}
