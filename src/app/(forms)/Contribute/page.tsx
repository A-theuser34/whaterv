'use client'

import React, { useState,useRef  } from "react";
import ButtonForm from "./ButtonForm";
import { handleFormSubmit } from "@/mig/action";
const rockClimbingGrades = [
  "5.5",
  "5.6",
  "5.7",
  "5.8",
  "5.9",
  "5.10a",
  "5.10b",
  "5.10c",
  "5.10d",
  "5.11a",
  "5.11b",
  "5.11c",
  "5.11d",
  "5.12a",
  "5.12b",
  "5.12c",
  "5.12d",
];
export default function Page() {
    const [error,seError] = useState('')
    const formRef = useRef<HTMLFormElement>(null); 

     async function clientAction(data:FormData){

        const res = await handleFormSubmit(data);
    

        if(res?.error){
            seError(res.error)
        }else{
            seError('succes')
            formRef.current?.reset()
          }
        
    }
   

 return (
  <div>
      <div className="min-h-screen bg-gray-100 py-12 flex flex-col justify-center sm:py-16">
      <div className="text-center mb-8">
            <h1 className=" text-7xl   font-bold text-gray-900">Climbing Routes Submissions</h1>
            <p className="text-xl text-gray-600">Discover climbing routes around the world. Share your own routes and connect with other climbers.</p>
      </div>
    <div className="relative py-6 sm:max-w-2xl sm:mx-auto">
        <div className="relative px-6 py-12 bg-white shadow-lg sm:rounded-3xl sm:p-24">

          <form action={clientAction} className="max-w-2xl mx-auto">
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700">Submit a Route</h2>
              <p className="text-gray-600">Enter the details of your climbing route to add it to the map.</p>
            </div>
            <div className="mb-8">
              <label htmlFor="place" className="block text-lg font-medium text-gray-700">Name of the Place</label>
              <input
                name="place"
                placeholder="Name of the place"
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="grade" className="block text-lg font-medium text-gray-700">Grade</label>
              <select name="grade" required className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50">
                {rockClimbingGrades.map(grade => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-8">
              <label htmlFor="lat" className="block text-lg font-medium text-gray-700">Latitude</label>
              <input
                name="lat"
                type="number"
                min="-90"
                max="90"
                placeholder="Latitude (-90 to 90)"
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-8">
              <label htmlFor="long" className="block text-lg font-medium text-gray-700">Longitude</label>
              <input
                name="long"
                type="number"
                min="-180"
                max="180"
                placeholder="Longitude (-180 to 180)"
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="mt-8">
            <ButtonForm/>
            </div>
          </form>
        </div>
    </div>
    </div>
</div>

 );
}