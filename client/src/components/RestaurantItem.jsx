import React, { useContext } from 'react';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';
import { url } from '../apis/restaurantFinder';

const RestaurantItem = ({ restaurant }) => {
  const { deleteRestaurant } = useContext(RestaurantsContext);
  const { currentUser } = useContext(RestaurantsContext);
  const history = useHistory();

  const renderRating = ({ count, avg_rating: rating }) => {
    return count ? (
      <>
        <StarRating rating={rating} />
        <span className='text-warning ml-1'>({count})</span>
      </>
    ) : (
      <span className='text-warning ml-1'>No reviews</span>
    );
  };

  const handleSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      fetch(url.restaurants + id, {
        method: 'DELETE',
      });
      deleteRestaurant(id);
    } catch (err) {
      console.log(err);
    }
  };

  const { id, name, location, price_range } = restaurant;

  let updateBtn, deleteBtn;
  if (currentUser) {
    updateBtn = (
      <button onClick={(e) => handleUpdate(e, id)} className='btn btn-warning'>
        Update
      </button>
    );

    deleteBtn = (
      <button onClick={(e) => handleDelete(e, id)} className='btn btn-danger'>
        Delete
      </button>
    );
  } else {
    updateBtn = (
      <button className='btn btn-warning' disabled>
        Update
      </button>
    );

    deleteBtn = (
      <button className='btn btn-danger' disabled>
        Delete
      </button>
    );
  }

  return (
    <>
      <tr style={{ cursor: 'pointer' }} onClick={() => handleSelect(id)}>
        <td className='align-middle'>{name}</td>
        <td className='align-middle'>{location}</td>
        <td className='align-middle'>{'$'.repeat(price_range)}</td>
        <td className='align-middle'>{renderRating(restaurant)}</td>
        <td className='align-middle'>{updateBtn}</td>
        <td className='align-middle'>{deleteBtn}</td>
      </tr>
    </>
  );
};

export default RestaurantItem;
