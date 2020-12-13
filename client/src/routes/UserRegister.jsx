import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { url } from '../apis/restaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const UserRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useContext(RestaurantsContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      password,
    };
    try {
      const res = await fetch(url.users, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setCurrentUser(data.user);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-4 mx-auto" style={{ maxWidth: '300px' }}>
      <form action="" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col mt-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col mt-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col mt-2">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col mt-4">
            <button type="submit" className="btn btn-primary mr-2">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
