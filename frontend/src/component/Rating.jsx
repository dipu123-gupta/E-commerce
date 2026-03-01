// Import CSS for star rating styles
import "../componentStyles/Rating.css";

// Import React hooks
import { useState, useEffect } from "react";

const Rating = ({ value, onRatingChange, disabled }) => {
  // ---------------------------------------
  // State for hovered star (for hover effect)
  // ---------------------------------------
  const [hoveredRating, setHoveredRating] = useState(0);

  // State for selected rating
  const [selectedRating, setSelectedRating] = useState(value || 0);

  // Sync component state when value prop changes
  useEffect(() => {
    setSelectedRating(value || 0);
  }, [value]);

  // ---------------------------------------
  // Mouse hover on star
  // ---------------------------------------
  const handleMouseEnter = (rating) => {
    if (!disabled) {
      setHoveredRating(rating);
    }
  };

  // Mouse leaves star
  const handleMouseLeave = () => {
    if (!disabled) {
      setHoveredRating(0);
    }
  };

  // ---------------------------------------
  // Click star to select rating
  // ---------------------------------------
  const handleClick = (rating) => {
    if (!disabled) {
      setSelectedRating(rating);

      // Send selected rating back to parent component
      if (onRatingChange) {
        onRatingChange(rating);
      }
    }
  };

  // ---------------------------------------
  // Generate star elements dynamically
  // ---------------------------------------
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      // Determine if star should be filled
      const isFilled = i <= (hoveredRating || selectedRating);

      stars.push(
        <span
          key={i}
          className={`star ${isFilled ? "filled" : "empty"}`}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
          style={{ pointerEvents: disabled ? "none" : "auto" }}
        >
          ★
        </span>,
      );
    }

    return stars;
  };

  // Render rating component
  return <div className="rating">{renderStars()}</div>;
};

export default Rating;
