// "use client"
// import React, { useEffect, useState } from 'react';
// import { GoogleMap, useJsApiLoader,Marker,InfoWindow  } from '@react-google-maps/api';
// import Link from 'next/link';
// import { supabase } from '@/mig/db';
// import { RockClimbing } from '@/interface/interfce';

// export default function Home() {
//   const [data,setData]= useState<RockClimbing[]>([])
//   const [selectedPlace, setSelectedPlace] = useState<RockClimbing | null>(null);

//   const containerStyle = {
//     width: '70%', // Set to  100% to fill the width of the parent container
//     height: '60vh', // Set to  100vh to fill the height of the viewport
//     display: 'flex', // Use flexbox to center the map horizontally and vertically
//     justifyContent: 'center', // Horizontally align the map in the center
//     alignItems: 'center', // Vertically align the map in the center
//   };
  
//   const center = {
//     lat: 38.0902,
//     lng: -77.7129
//   };
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

//   })
//   const handleMarkerClicks = (place:RockClimbing)=>{
//     setSelectedPlace(place)
//   }

//   useEffect(()=>{
//     const fecthData = async()=>{
//       const { data, error } = await supabase.from('rocks').select('*').eq('approved',true);
//       if (error) {
//         console.error('Error fetching data:', error);
//         return;
//       }
//       setData(data)
//     }
//     fecthData()
//   },[])
  
//   const [map, setMap] = React.useState<google.maps.Map | null>(null);

//   const usaBounds = {
//     north:  49.384358,
//     south:  24.396308,
//     west: -124.848974,
//     east: -66.934570,
//   };

  
//   const onLoad = React.useCallback(function callback(mapInstance: google.maps.Map) {
//     mapInstance.setOptions({
//       restriction: {
//         latLngBounds: usaBounds,
//         strictBounds: true,
//       },
//     });
//     const bounds = new window.google.maps.LatLngBounds(center);
//     mapInstance.fitBounds(bounds);
//   }, []);

//  const onUnmount = React.useCallback(function callback(mapInstance: google.maps.Map | null) {
//   setMap(null);
// }, []);




// return isLoaded ? (
//   <GoogleMap
//     mapContainerStyle={containerStyle}
//     center={center}
//     zoom={4} 
//     onLoad={onLoad}
//     onUnmount={onUnmount}
//   >
//     {data?.map((rock,index)=>{
//     return(
//       <div>
//           <Marker onClick={()=> handleMarkerClicks(rock)} key={index} position={{lat:rock.lat,lng:rock.long}} />

//       </div>
//     )
      
// } )}

//  {selectedPlace && (
//         <InfoWindow
//           position={{ lat: selectedPlace.lat, lng: selectedPlace.long }}
//           onCloseClick={() => setSelectedPlace(null)}
//         >
//           <div>
//             <h2>{selectedPlace.grade}</h2>
//             <p>{selectedPlace.place}</p>
//             <Link href={`/route/${selectedPlace.place}`}>
//               see more
//             </Link>
//           </div>
//         </InfoWindow>
//       )}
    
      
//   </GoogleMap>
// ) : <></>;
// }
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
