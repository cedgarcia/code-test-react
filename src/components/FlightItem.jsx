import React, { useState } from "react";

const FlightItem = React.forwardRef(({ flight }, ref) => {
  const [showDetails, setShowDetails] = useState(false);

  const launchDate = new Date(flight.launch_date_utc).toLocaleDateString();

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <li className="flight-item" ref={ref}>
      <div className="mission-header">
        <div className="mission-info">
          <h1 className="mission-title">
            {flight.mission_name}{" "}
            {flight.upcoming && (
              <span className="badge upcoming">Upcoming</span>
            )}
            <span
              className={`flight-status ${
                flight.launch_success ? "success" : "failure"
              }`}
            >
              {flight.launch_success ? "Success" : "Failed"}
            </span>
          </h1>
          <button className="toggle-button" onClick={toggleDetails}>
            {showDetails ? "HIDE" : "VIEW"}
          </button>
        </div>
      </div>
      {showDetails && (
        <div className="details-container">
          {/* Links on top */}
          <div className="links">
            {flight.links.article_link && (
              <a
                href={flight.links.article_link}
                target="_blank"
                rel="noopener noreferrer"
                className="link-button"
              >
                Read Article
              </a>
            )}
            {flight.links.video_link && (
              <a
                href={flight.links.video_link}
                target="_blank"
                rel="noopener noreferrer"
                className="link-button"
              >
                Watch Video
              </a>
            )}
          </div>

          <div className="details-content">
            {/* {flight.links.mission_patch_small ? (
              <img
                src={flight.links.mission_patch_small}
                alt={flight.mission_name}
                className="flight-image"
              />
            ) : (
              <span className="no-image">*No image yet*</span>
            )} */}
            <div className="text">
              <h2>
                Flight {flight.flight_number} ({launchDate})
              </h2>
              <p>{flight.details || "No details available"}</p>
            </div>
          </div>
        </div>
      )}
    </li>
  );
});

export default FlightItem;
