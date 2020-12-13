import React, { useState, createContext } from 'react';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const addRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  const deleteRestaurant = (id) => {
    setRestaurants(
      restaurants.filter((restaurant) => restaurant.id !== id)
    );
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        currentUser,
        setCurrentUser,
        addRestaurant,
        deleteRestaurant,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
