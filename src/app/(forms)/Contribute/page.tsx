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
   <div >
       <form 
       ref={formRef}
       action={clientAction} className="flex flex-col gap-6 items-center">
         <input
           name="place"
           placeholder="Name of the place"
           required
         />
         grade<select name="grade" required>
          {rockClimbingGrades.map(grade => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
         <input
           name="lat"
           type="number"
           min="-90"
           max="90"
           placeholder="Latitude (-90 to  90)"
           required
         />
         <input
           name="long"
           type="number"
           min="-180"
           max="180"
           placeholder="Longitude (-180 to  180)"
           required
         />
         <div className="flex justify-center">
           <div>
             <ButtonForm/>
           </div>
           {error}
         </div>
       </form>
   </div>
 );
}