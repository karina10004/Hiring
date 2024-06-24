import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './Auth/Register';
import Login from './Auth/Login';
import CompanyRegister from './Auth/CompanyRegister';
import CompanyLogin from './Auth/CompanyLogin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/companyregister' element={<CompanyRegister />} />
        <Route path='/companylogin' element={<CompanyLogin />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
