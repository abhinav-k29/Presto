import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import EditPresentation from './pages/EditPresentation';

import config from './config.json';
const BACKEND_PORT = config.BACKEND_PORT;
export const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;

function App () {
  let lsToken = null;
  if (localStorage.getItem('token')) {
    lsToken = localStorage.getItem('token');
  }
  const [token, setToken] = React.useState(lsToken);

  const storeToken = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    if (token === null) {
      localStorage.removeItem('token', token);
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to={token ? '/dashboard' : '/login'} />} />
          <Route path="/dashboard" element={<Dashboard token={token} setTokenFunction={storeToken} />} />
          <Route path="/register" element={<Register token={token} setTokenFunction={storeToken} />} />
          <Route path="/login" element={<Login token={token} setTokenFunction={storeToken} />} />
          <Route path="/presentation/:id" element={<EditPresentation token={token} setTokenFunction={storeToken} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
