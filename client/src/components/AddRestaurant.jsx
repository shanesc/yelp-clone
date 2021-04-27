import React, { useContext, useState } from 'react';
import { url } from '../apis/restaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      location,
      price_range: priceRange,
    };
    try {
      const res = await fetch(url.restaurants, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      addRestaurant(data.data.restaurant);
    } catch (err) {
      console.log(err);
    }
    setName('');
    setLocation('');
    setPriceRange('');
  };

  return (
    <div className='mb-4'>
      <form action='' onSubmit={handleSubmit}>
        <div className='form-row'>
          <div className='col'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              className='form-control'
              placeholder='Name'
            />
          </div>
          <div className='col'>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type='text'
              className='form-control'
              placeholder='Location'
            />
          </div>
          <div className='col'>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className='custom-select mr-sm-2'
            >
              <option disabled>Price Range</option>
              <option value='1' selected>
                $
              </option>
              <option value='2'>$$</option>
              <option value='3'>$$$</option>
              <option value='4'>$$$$</option>
              <option value='5'>$$$$$</option>
            </select>
          </div>
          <button type='submit' className='btn btn-primary'>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
