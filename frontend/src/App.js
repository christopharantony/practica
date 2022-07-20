import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Login from './Pages/Admin/Login/AdminLogin';
import About from './Pages/User/About/About';
import Landing from './Pages/User/Landing/Landing';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/about' element={<About />} />
      <Route path='/adminLogin' element={<Login />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
