import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { url } from '../apis/restaurantFinder';

const AddReview = ({ fetchRestaurant }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      rating,
      content,
    };

    try {
      await fetch(url.restaurants + id + '/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      fetchRestaurant(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
            <option disabled>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
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
      <button type="submit" className="btn btn-primary">
        Add Review
      </button>
    </form>
  );
};

export default AddReview;
