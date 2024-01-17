import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotels } from "../../context/HotelsProvider";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";


function Map() {
    const{isLoading,data:hotels}=useHotels()
    const[mapCenter,setMapCenter] = useState([52, 5])
    const[searchParams,setSearchParams]=useSearchParams()
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
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
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {hotels.map(item=>
                <Marker key={item.id} position={[item.latitude,item.longitude]}>
                <Popup>
                    {item.name} <br /> {item.smart_location}
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