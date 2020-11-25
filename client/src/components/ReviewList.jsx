import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews }) => {
  return (
    <div className="form-row row-cols-3 justify-content-center mb-2 mx-0">
      {reviews.map((review) => {
        return <ReviewItem key={review.id} review={review} />;
      })}
    </div>
  );
};

export default ReviewList;
