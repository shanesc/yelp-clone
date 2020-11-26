import React from 'react';
import ReviewItem from './ReviewItem';

const ReviewList = ({ reviews }) => {
  //TODO: Add users, authentication, and reviews for a specific user
  return (
    <div className="form-row row-cols-3 justify-content-between mb-2 mx-0">
      {reviews.map((review) => {
        return <ReviewItem key={review.id} review={review} />;
      })}
    </div>
  );
};

export default ReviewList;
