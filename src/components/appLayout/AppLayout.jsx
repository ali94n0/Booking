import { Outlet } from "react-router-dom";
import Map from "../map/Map";


const AppLayout = () => {
    return (
        <div className="appLayout">
            <div className="sidebar"><Outlet/></div>
            
            <Map/>
        </div>
    );
};

export default AppLayout;