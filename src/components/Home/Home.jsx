import React from 'react';
import useLogout from '../Auth/Logout';

const Home = () => {
  const logout = useLogout();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
