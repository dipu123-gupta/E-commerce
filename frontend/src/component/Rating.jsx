import React from "react";
import "../componentStyles/Rating.css";
import { useState } from "react";

const starClass = "star";

const Rating = ({ value, onRatingChange, disabled }) => {
  const [haveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value || 0);
  //!   Handle star hover
  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoveredRating(rating);
    }
  };
  //!   Handle star leave
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoveredRating(0);
    }
  };
  //!   Handle star click
  const handleClick = (rating) => {
    if (!disabled) {
      setSelectedRating(rating);
      if (onRatingChange) {
        onRatingChange(rating);
      }
    }
  };

  //! Function to generate stars based on the selected rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (haveredRating || selectedRating);
      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? "filled" : "empty"}`}
          onMouseEnter={() => handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick}
          style={{ pointerEvents: disabled ? "none" : "auto" }}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  return <div className="rating">{renderStars()}</div>;
};

export default Rating;
