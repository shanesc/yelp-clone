import React from 'react';
import { useHistory } from 'react-router-dom';

const RegisterButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/users/register');
  };

  return (
    <div
      className="position-absolute"
      style={{ top: '1rem', right: '1rem' }}
    >
      <button onClick={handleClick} className="btn btn-link">
        Register
      </button>
    </div>
  );
};

export default RegisterButton;
