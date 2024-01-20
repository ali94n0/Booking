import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarksProvider";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import { useEffect } from "react";


function BookmarksList(props) {
    const{isLoading,getAllBookmarks,bookmarks,currentBookmark,DeleteBookmark} = useBookmark()

    useEffect(()=>{
        getAllBookmarks()
    },[])

    const handleDelete = async(e,id)=>{
        e.preventDefault()
        await DeleteBookmark(id)
    }

    if(isLoading || !bookmarks)return <Loader/>
    if(!bookmarks.length)return<p style={{color:"red"}}>Please Click Somewhere to Add New Bookmark.</p>
    return (
        <div className="bookmarkList">
            <h2>Bookmarks List :</h2>
           {bookmarks.map(item=><BookmarkItem key={item.id} item={item} currentBookmark={currentBookmark} handleDelete={handleDelete}/>)}
        </div>
    );
}

export default BookmarksList;

const BookmarkItem = ({item,currentBookmark,handleDelete})=>{
    return(
        <Link to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`} >
        <div  className={`bookmarkItem ${item.id === currentBookmark?.id ? "current-bookmark" :""}`}>
    <div><ReactCountryFlag svg countryCode={item.countryCode}/>
    &nbsp; <strong>{item.cityName}</strong> &nbsp; <span>{item.country}</span></div>
    <button onClick={(e)=>handleDelete(e,item.id)} className="btn trash"><HiTrash/></button>
   </div>
   
    </Link>
    )
}