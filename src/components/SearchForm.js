import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../styles/SearchForm.css';

const SearchForm = () => {
  const { updateUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    mobileNumber: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Entered mobile number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateUserData(formData);
      navigate('/map');
    }
  };

  return (
    <div className="search-form-container">
      <h2>User Information</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className={errors.mobileNumber ? 'error' : ''}
          />
          {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}
        </div>
        
        <button type="submit" className="submit-button">Continue to Map</button>
      </form>
    </div>
  );
};

export default SearchForm;