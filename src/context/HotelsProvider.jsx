import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const HotelsContext = createContext()
const BASE_URL = "https://booking-json-server-ivory.vercel.app"

export default function HotelsProvider({children}){
    const [searchParams,setSearchParams] = useSearchParams()
    const destination = searchParams.get("destination");
    const options = JSON.parse(searchParams.get("option"))

    const[currentHotel,setCurrentHotel] = useState(null)
    const[isCurrHotelLoading , setIsCurrHotelLoading] = useState(false)

    
const getSingleHotel = async(id)=>{
    setIsCurrHotelLoading(true)
    try {
        const {data} = await axios.get(`${BASE_URL}/hotels/${id}`)
        setCurrentHotel(data)
        setIsCurrHotelLoading(false)
    } catch (error) {
        toast.error(error?.message)
        setIsCurrHotelLoading(false)
    }
}

    const {isLoading,data}=useFetch(`${BASE_URL}/hotels`,`q=${destination || ""}&accommodates_gte=${options?.room || 1}`);

    return <HotelsContext.Provider value={{isLoading,data,currentHotel,isCurrHotelLoading,getSingleHotel}} >
        {children}
    </HotelsContext.Provider>
}

export const useHotels =()=>{
    return useContext(HotelsContext)
}