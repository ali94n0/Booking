import { useEffect, useState } from "react";
import useUrlLocation from "../../hooks/useUrlLocation";
import axios from "axios";
import toast from "react-hot-toast";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarksProvider";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const BASE_GEOCODING_API="https://api.bigdatacloud.net/data/reverse-geocode-client"

function AddBookmark(props) {
    
    const [country,setCountry] = useState("")
    const[cityName,setCityName] = useState("")
    const[countryCode,setCountryCode]=useState("")
    const{lat,lng} = useUrlLocation()
    const{addNewBookmark,isLoading,error} = useBookmark()
    const navigate = useNavigate()
    
    useEffect(()=>{
        const getLocationData=async()=>{
            try {
                const {data} = await axios.get(`${BASE_GEOCODING_API}?latitude=${lat}&longitude=${lng}`)
                if(!data.city || !data.countryName) throw new Error("This Location is not a City, Please Select Somewhere else.")
                setCityName(data.city || data.locality || "")
                setCountry(data.countryName)
                setCountryCode(data.countryCode)
            } catch (error) {
                toast.error(error.message)
            }
        }
        getLocationData()
    },[lat,lng])


    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!cityName || !country)return;

        const newBookmark={
            cityName,
            country,
            countryCode,
            latitude:lat,
            longitude:lng,
            host_location:`${cityName} ${country}`
        }
        await addNewBookmark(newBookmark)
        setCityName("")
        setCountry("")
        setCountryCode("")
        navigate("/bookmarks")
        
    }

    if(isLoading)return <Loader/>
    if(error)return toast.error(error)
    if(!cityName || !country){return(
        <div>
            <button onClick={(e)=>{
                        e.preventDefault();
                        navigate(-1)
                    }} className="btn btn--back">&larr;</button>
    <p style={{color:"green",padding:"10px 5px"}}>Please Click Somewhere to Add New Bookmark.</p>
            </div>
    )}
    return (
        <div>
            <form onSubmit={handleSubmit} className="form">
                <div className="formControl">
                <label htmlFor="country">Country:</label>
                <input value={country} onChange={()=>setCountry(e.target.value)} type="text" name="country" id="country">
                </input>
                    <ReactCountryFlag svg countryCode={countryCode} className="flag"/>
                </div>
                <div className="formControl">
                <label htmlFor="city">City:</label>
                <input value={cityName} onChange={()=>setCityName(e.target.value)} type="text" name="city" id="city"/>
                </div>
                <div className="buttons">
                    <button onClick={(e)=>{
                        e.preventDefault();
                        navigate(-1)
                    }} className="btn btn--back">&larr;</button>
                    <button type="submit" className="btn btn--primary">Add</button>
                </div>
            
            </form>
        </div>
    );
}

export default AddBookmark;