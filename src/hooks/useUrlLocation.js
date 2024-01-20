import { useParams, useSearchParams } from "react-router-dom";

function useUrlLocation() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { id } = useParams();

  return { lat, lng, id };
}

export default useUrlLocation;
