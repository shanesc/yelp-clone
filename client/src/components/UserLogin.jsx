import React, { useContext, useState } from 'react';
import { url } from '../apis/restaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useContext(RestaurantsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    try {
      const res = await fetch(url.users + '/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.user) {
        setCurrentUser(data.user);
      } else {
        alert('Incorrect login details');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4">
      <form action="" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="col">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary mr-2">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
