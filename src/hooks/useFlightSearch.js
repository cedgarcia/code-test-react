import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = `https://api.spacexdata.com/v3/launches`;

export default function useFlightSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;

    axios({
      method: "GET",
      url: API_URL,
      params: { limit: 10, offset: (pageNumber - 1) * 10 },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setFlights((prevFlights) => [...prevFlights, ...res.data]);
        setLoading(false);
        setHasMore(res.data.length > 0);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
        setLoading(false);
      });

    return () => cancel();
  }, [pageNumber]);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredFlights(flights);
    } else {
      const lowerQuery = query.toLowerCase();
      setFilteredFlights(
        flights.filter((flight) =>
          flight.mission_name.toLowerCase().includes(lowerQuery),
        ),
      );
    }
  }, [query, flights]);

  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setShowLoading(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [loading]);

  return { loading: showLoading, error, flights: filteredFlights, hasMore };
}
