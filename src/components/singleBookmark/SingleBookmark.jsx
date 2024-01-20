import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookmark } from '../../context/BookmarksProvider';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import ReactCountryFlag from 'react-country-flag';

function SingleBookmark(props) {
    const{id} = useParams()
    const navigate = useNavigate()

    const {isLoading,currentBookmark,getSingleBookmark,error}=useBookmark()

    useEffect(()=>{
        getSingleBookmark(id)
    },[id])

    if(isLoading || !currentBookmark)return <Loader/>
    if(error) return toast.error(error)
    return (
        <div className='bookmarkList'>
            <div style={{display:"flex",justifyContent:"space-between",margin:"10px 5px"}}>
            <h3>Bookmark Details :</h3>
            <button onClick={()=>navigate(-1)} className='btn btn--back'>&larr;</button>
            </div>
            <div className='bookmarkItemDetails'>
            <ReactCountryFlag svg countryCode={currentBookmark.countryCode}/>
    &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp; <span>{currentBookmark.country}</span>
            </div>
        </div>
    );
}

export default SingleBookmark;