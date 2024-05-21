import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../App';

function Logout ({ token, setToken }) {
  const [hoverStyle, setHoverStyle] = useState({});

  const handleMouseEnter = () => {
    setHoverStyle({ color: '#f1807e' });
  };

  const handleMouseLeave = () => {
    setHoverStyle({});
  };

  const logout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/admin/auth/logout`, {}, {
        headers: {
          Authorization: token,
        }
      });
      setToken(null);
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  };

  return (
    <div
      onClick={logout}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={hoverStyle}
    >
      Logout
    </div>
  );
}

export default Logout;
