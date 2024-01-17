import {Link} from "react-router-dom";

import Loader from "../components/Loader/Loader";
import { useHotels } from "../context/HotelsProvider";


const HotelsPage = () => {
    const {isLoading,data:hotels ,currentHotel}=useHotels()

// console.log(currentHotel);
    if(isLoading){<Loader/>}

    return (
        <div className="searchList">
            <h3>Search Results ({hotels.length})</h3>
 {hotels.map(item => <HotelsItem key={item.id} item={item} currentHotel={currentHotel}/>)} 
        </div>
    );
};

export default HotelsPage;

const HotelsItem=({item,currentHotel})=>{
    return(
        <Link to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
        <div className={`searchItem ${item.id === currentHotel?.id ? "current-hotel" : ""}`}>
            <img src={item.picture_url.url} alt={item.name}></img>
            <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">€&nbsp;{item.price}&nbsp;<span>night</span></p>
            </div>
        </div>
        </Link>
    )
}