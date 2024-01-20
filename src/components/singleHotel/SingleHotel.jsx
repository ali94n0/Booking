import { useNavigate, useParams } from "react-router-dom";
import { useHotels } from "../../context/HotelsProvider";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import { useEffect } from "react";


const SingleHotel = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {currentHotel,isCurrHotelLoading,getSingleHotel} = useHotels()
    useEffect(()=>{
        getSingleHotel(id)
    },[id])
    if(isCurrHotelLoading || !currentHotel )return <Loader/>
    return (
        <div className="room">
            <button onClick={(e)=>{
                e.preventDefault();
                navigate(-1)
            }}  className="btn btn--back back--header">&larr;</button>
            <div className="roomDetail">
                
                    <h2>{currentHotel.name}</h2>
                <div>{currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}</div>
                
                <img src={currentHotel.picture_url?.url} alt={currentHotel.name}/>
            </div>
        </div>
    );
};

export default SingleHotel;