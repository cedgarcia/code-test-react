import FlightItem from "./FlightItem";

const FlightList = ({ flights, lastFlightRef }) => {
  return (
    <ul className="flight-list">
      {flights.map((flight, index) => {
        if (flights.length === index + 1) {
          return (
            <FlightItem
              key={flight.flight_number}
              flight={flight}
              ref={lastFlightRef}
            />
          );
        } else {
          return <FlightItem key={flight.flight_number} flight={flight} />;
        }
      })}
    </ul>
  );
};

export default FlightList;
