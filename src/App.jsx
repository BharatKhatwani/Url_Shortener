import React from 'react';
import './App.css';
import Login from './Components/Login.jsx';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Components/Signup.jsx';
import Home from './Components/Home.jsx';
import NotFound from './Components/NOTFOUND.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
