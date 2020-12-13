import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { url } from '../apis/restaurantFinder';

const UpdateRestaurant = () => {
  const history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const fetchRestaurant = async () => {
    try {
      const res = await fetch(url.restaurants + id);
      const { data } = await res.json();
      const { name, location, price_range } = data.restaurant;
      setName(name);
      setLocation(location);
      setPriceRange(price_range);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      location,
      price_range: priceRange,
    };
    try {
      await fetch(url.restaurants + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      await history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            id="location"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            className="form-control custom-select"
          >
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
