"use client"
import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader,Marker,InfoWindow  } from '@react-google-maps/api';
import Link from 'next/link';

import { RockClimbing } from '@/interface/interfce';
import { clientServer } from '@/utils/supabase/client';

export default function Home() {
  const [data,setData]= useState<RockClimbing[]>([])
  const [selectedPlace, setSelectedPlace] = useState<RockClimbing | null>(null);

  const containerStyle = {
    width: '100%', // Adjust as necessary
    height: '90vh', // Increase to take up more of the viewport height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   };
   
  
  const center = {
    lat: 38.0902,
    lng: -77.7129
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  })
  const handleMarkerClicks = (place:RockClimbing)=>{
    setSelectedPlace(place)
  }

  useEffect(()=>{
    const supabase = clientServer()
    const fecthData = async()=>{
      const { data, error } = await supabase.from('rocks').select('*').eq('approved',true);
      if (error) {
        console.error('Error fetching data:', error);
        return;                                               
      }
      setData(data)
    }
    fecthData()
  },[])
  
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const usaBounds = {
    north:  49.384358,
    south:  24.396308,
    west: -124.848974,
    east: -66.934570,
  };

  
  const onLoad = React.useCallback(function callback(mapInstance: google.maps.Map) {
    mapInstance.setOptions({
      restriction: {
        latLngBounds: usaBounds,
        strictBounds: true,
      },
    });
    const bounds = new window.google.maps.LatLngBounds(center);
    mapInstance.fitBounds(bounds);
  }, []);

 const onUnmount = React.useCallback(function callback(mapInstance: google.maps.Map | null) {
  setMap(null);
}, []);




return isLoaded ? (
  <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={4} 
    onLoad={onLoad}
    onUnmount={onUnmount}
  >
    {data?.map((rock,index)=>{
    return(
      <div>
          <Marker onClick={()=> handleMarkerClicks(rock)} key={index} position={{lat:rock.lat,lng:rock.long}} />

      </div>
    )
      
} )}

 {selectedPlace && (
        <InfoWindow
          position={{ lat: selectedPlace.lat, lng: selectedPlace.long }}
          onCloseClick={() => setSelectedPlace(null)}
        >
          <div>
            <h2>{selectedPlace.grade}</h2>
            <p>{selectedPlace.place}</p>
            <Link href={`/route/${selectedPlace.id}`}>
              see more
            </Link>
          </div>
        </InfoWindow>
      )}
    
    


  </GoogleMap>
) : <></>;
}

