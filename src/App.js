import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import MapPage from './components/MapPage';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;