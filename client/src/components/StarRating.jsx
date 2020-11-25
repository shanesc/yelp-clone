import React from 'react';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <i key={i} className="fas fa-star text-warning"></i>
      );
    } else if (i > rating && i < rating + 1) {
      stars.push(
        <i key={i} className="fas fa-star-half-alt text-warning"></i>
      );
    } else {
      stars.push(
        <i key={i} className="far fa-star text-warning"></i>
      );
    }
  }
  return <div className="d-inline-block">{stars}</div>;
};

export default StarRating;
