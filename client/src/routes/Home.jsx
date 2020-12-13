import React, { useContext } from 'react';
import Header from '../components/Header';
import AddRestaurant from '../components/AddRestaurant';
import RestaurantList from '../components/RestaurantList';
import UserLogin from '../components/UserLogin';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RegisterButton from '../components/RegisterButton';

const Home = () => {
  const { currentUser } = useContext(RestaurantsContext);

  if (currentUser) {
    return (
      <div>
        <Header />
        <AddRestaurant />
        <RestaurantList />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <RegisterButton />
        <UserLogin />
        <RestaurantList />
      </div>
    );
  }
};

export default Home;
