import { set } from "date-fns";
import { useState } from "react";

function useGeoLocation() {
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [geoLocation, setGeoLocation] = useState({});
  const [error, setError] = useState(null);

  function getCurrentLocation() {
    if (!navigator.geolocation)
      return setError("your browser can't support geoLocation");
    setIsGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeoLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsGeoLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsGeoLoading(false);
      }
    );
  }

  return { geoLocation, getCurrentLocation, isGeoLoading, error };
}

export default useGeoLocation;
