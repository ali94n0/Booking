import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";


const HotelsList = () => {
    const{isLoading,data}=useFetch("http://localhost:5000/hotels");

    // if(isLoading)return<p>Loading data...</p>
    return (
        <div className="nearbyLocation">
            <h2>Nearby Location</h2>
            <div className="locationList">
              {isLoading ? <Loader/> : data.map(item=><HotelItem key={item.id} item={item}/>)}
                
            </div>
        </div>
    );
};

export default HotelsList;

const HotelItem = ({item})=>{
    return<Link to={`hotels/${item.id}`}>
    <div className="locationItem">
        <img src={item.picture_url.url} alt={item.name}/>
        <div className="locationItemDesc">
            <p className="location">{item.smart_location}</p>
            <p className="name">{item.name}</p>
            <p className="price">€&nbsp;{item.price}&nbsp;<span>night</span></p>
        </div>
    </div></Link>
}