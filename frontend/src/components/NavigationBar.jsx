import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import LogoutButton from '../components/LogoutButton';
import NameModal from '../components/NameModal';

import logoImage from '../assets/pppp-removebg-preview.png';

function Navi ({ token, setTokenFunction, currPresentations, showModal, setShowModal, setStore }) {
  const [hoverStyle, setHoverStyle] = useState({});

  const handleMouseEnter = () => {
    setHoverStyle({ color: '#90EE90' });
  };

  const handleMouseLeave = () => {
    setHoverStyle({});
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={logoImage}
            width="30"
            height="24"
            className="d-inline-block align-top"
            alt="Presto Logo"
          />
          resto
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={ { alignItems: 'center', marginLeft: '1vw' } }>
            <Nav.Link href="#" active>
            <div
            onClick={() => setShowModal(true)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={hoverStyle}
            >New presentation</div>
            {showModal && <NameModal
              token={token}
              onClose={() => setShowModal(false)}
              currPresentations={currPresentations}
              setStore={setStore}
            />
            }
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto" style={ { alignItems: 'center' } }>
            <Nav.Link href="#" active><LogoutButton token={token} setToken={setTokenFunction} /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Navi;
