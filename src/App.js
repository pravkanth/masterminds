import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import HomePage from './components/homepage/HomePage';
import Nav from './components/nav/Nav';
import Register from './components/user/Register'
import Login from './components/user/Login'
import Checkout from './components/checkout/Checkout';
import Orders from './components/checkout/Orders';

function App() {
  return (
    <>
      <Router key="router">
        <div className="container">
          <Nav/>
          <Routes>
            <Route path='/' element={<HomePage />} key="homepage"/>
            <Route path='/register' element={<Register />} key="register"/>
            <Route path='/login' element={<Login/>} key="login"/>
            <Route path='/checkout' element={<Checkout/>} key="checkout"/>
            <Route path='/orders' element={<Orders/>} key="orders"/>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
