import { Outlet } from "react-router-dom";
import Map from "../map/Map";
import { useBookmark } from "../../context/BookmarksProvider";
import { useEffect } from "react";


function BookmarkLayout() {
    const {bookmarks,getAllBookmarks} = useBookmark()
    useEffect(()=>{
        getAllBookmarks()
    },[])
    return (
        <div className="appLayout">
            <div className="sidebar"><Outlet/></div>
            
            <Map markerLocation={bookmarks}/>
        </div>
    );
}

export default BookmarkLayout;