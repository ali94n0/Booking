import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from "react-leaflet";

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";


function Map({markerLocation}) {
    
    const[mapCenter,setMapCenter] = useState([52, 5])
    const{lat,lng} = useUrlLocation()
    const{getCurrentLocation,geoLocation,isGeoLoading} = useGeoLocation()

    useEffect(()=>{
        if(lat && lng){
            setMapCenter([lat,lng])
        } 
    },[lat,lng])

    useEffect(()=>{
        if(geoLocation?.lat && geoLocation?.lng){
            setMapCenter([geoLocation.lat,geoLocation.lng])
        }
    },[geoLocation])

        return (
           <div  className="mapContainer">
            <MapContainer className="map" center={mapCenter} zoom={5} scrollWheelZoom={true}>
                <ChangeCenter position={mapCenter}/>
                <ClickOnMap/>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markerLocation?.map(item=>
                <Marker key={item.id} position={[item.latitude,item.longitude]}>
                <Popup>
                    {item.host_location}
                </Popup>
                </Marker>)}
                <button onClick={getCurrentLocation} className="getLocation">
                    {isGeoLoading ? "Loading ..." : "use your location"}
                </button>
            </MapContainer>
           </div>
        );
}

export default Map;

function ChangeCenter({position}){
    const map=useMap()
    map.setView(position)
    return null
}

const ClickOnMap=()=>{

    const navigate = useNavigate()
    const map = useMapEvent({
        click: (e)=>{
            navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
           
        }
    })
}