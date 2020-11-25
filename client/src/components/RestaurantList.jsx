import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { url } from '../apis/restaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = () => {
  const {
    restaurants,
    setRestaurants,
    deleteRestaurant,
  } = useContext(RestaurantsContext);

  const history = useHistory();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setRestaurants(data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRestaurants();
  }, []);

  const renderRestaurants = (restaurantsArray) => {
    if (restaurantsArray)
      return restaurantsArray.map((restaurant) => {
        const { id, name, location, price_range } = restaurant;
        return (
          <tr onClick={() => handleSelect(id)} key={id}>
            <td>{name}</td>
            <td>{location}</td>
            <td>{'$'.repeat(price_range)}</td>
            <td>Rating</td>
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
        );
      });
  };

  const handleSelect = (id) => {
    history.push(`/restaurants/${id}`);
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

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {/* TODO: Replace with Restaurant component */}
        {/* TODO: Add favorite/star feature */}
        <tbody>{renderRestaurants(restaurants)}</tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
