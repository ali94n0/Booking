import { Outlet, useParams } from "react-router-dom";
import Map from "../map/Map";
import { useHotels } from "../../context/HotelsProvider";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect } from "react";


const AppLayout = () => {
    const{data}=useHotels()
    
    return (
        <div className="appLayout">
            <div className="sidebar"><Outlet/></div>
            
           <Map markerLocation={data}/>
        </div>
    );
};

export default AppLayout;