import React, { useContext } from 'react';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';
import { url } from '../apis/restaurantFinder';

const RestaurantItem = ({ restaurant }) => {
  const { deleteRestaurant } = useContext(RestaurantsContext);
  const history = useHistory();

  const renderRating = ({ count, avg_rating: rating }) => {
    return count ? (
      <>
        <StarRating rating={rating} />
        <span className="text-warning ml-1">({count})</span>
      </>
    ) : (
      <span className="text-warning ml-1">No reviews</span>
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
      fetch(url + id, {
        method: 'DELETE',
      });
      deleteRestaurant(id);
    } catch (err) {
      console.log(err);
    }
  };

  const { id, name, location, price_range } = restaurant;
  return (
    <>
      <tr onClick={() => handleSelect(id)} key={id}>
        <td>{name}</td>
        <td>{location}</td>
        <td>{'$'.repeat(price_range)}</td>
        <td>{renderRating(restaurant)}</td>
        <td>
          <button
            onClick={(e) => handleUpdate(e, id)}
            className="btn btn-warning"
          >
            Update
          </button>
        </td>
        <td>
          <button
            onClick={(e) => handleDelete(e, id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default RestaurantItem;
