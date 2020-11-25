import React from 'react';
import StarRating from './StarRating';

const ReviewItem = ({ review }) => {
  const { name, rating, content } = review;
  return (
    <div
      className="card text-white bg-primary mb-3 mr-4"
      style={{ maxWidth: '30%' }}
    >
      <div className="card-header d-flex justify-content-between">
        <span>{name}</span>
        <StarRating rating={rating} />
      </div>
      <div className="card-body">
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
