import React, { useState, useRef, useCallback } from "react";
import "./App.css";

// Components
import Spinner from "./components/Spinner";
import Searchbar from "./components/SearchBar";
import FlightList from "./components/FlightList";

// Hook
import useFlightSearch from "./hooks/useFlightSearch";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { flights, hasMore, loading, error } = useFlightSearch(
    query,
    pageNumber,
  );

  const observer = useRef();
  const lastFlightElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPageNumber(1);
  };

  return (
    <div className="App">
      <Searchbar value={query} onChange={handleSearch} />
      <FlightList flights={flights} lastFlightRef={lastFlightElementRef} />
      {loading && <Spinner />}
      {error && <p>Error loading flights.</p>}
      {!hasMore && !loading && (
        <p style={{ textAlign: "center" }}>End of List</p>
      )}
    </div>
  );
}

export default App;
