import React, { useState } from 'react';

const AddReview = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');

  return (
    <form>
      <div className="form-row">
        <div className="form-group col-8">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            placeholder="Name"
            className="form-control"
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="rating">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            id="rating"
            className="custom-select"
          >
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="content">Review</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="content"
          className="form-control"
          placeholder="Leave a review..."
          rows="5"
        ></textarea>
      </div>
      {/* <button type="submit" className="btn btn-primary">
        Add Review
      </button> */}
    </form>
  );
};

export default AddReview;
