import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import '../styles/Header.css';

const Header = () => {
  const { userData } = useContext(UserContext);
  
  return (
    <div className="header">
      {userData.firstName && <h1>{userData.firstName}</h1>}
    </div>
  );
};

export default Header;