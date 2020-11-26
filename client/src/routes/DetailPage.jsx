import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { url } from '../apis/restaurantFinder';
import ReviewList from '../components/ReviewList';
import AddReview from '../components/AddReview';

const DetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );
  const [restaurantIsLoaded, setRestaurantIsLoaded] = useState(false);

  const fetchRestaurant = async (id) => {
    try {
      const res = await fetch(url + id);
      const { data } = await res.json();
      setSelectedRestaurant(data.restaurant);
      setRestaurantIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRestaurant(id);
  }, []);

  return (
    <div className="mt-3">
      {restaurantIsLoaded ? (
        <>
          <h1>{selectedRestaurant.name}</h1>
          <ReviewList reviews={selectedRestaurant.reviews} />
        </>
      ) : (
        ''
      )}
      <AddReview fetchRestaurant={fetchRestaurant} />
    </div>
  );
};

export default DetailPage;
