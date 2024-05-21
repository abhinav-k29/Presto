import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PresentationList ({ presentations, setTokenFunction, setStore }) {
  const navigate = useNavigate();
  return (
    <Row xs={1} md={2} lg={4} className="g-3">
      {presentations.map((presentation, index) => (
        <Col key={index}>
          <HoverCard presentation={presentation} navigate={navigate} setTokenFunction={setTokenFunction} setStore={setStore} />
        </Col>
      ))}
    </Row>
  );
}

function HoverCard ({ presentation, setTokenFunction, setStore }) {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (

    <Card
      style={{
        aspectRatio: 2 / 1,
        marginBottom: '1rem',
        minWidth: '100px',
        transform: isHovering ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.2s ease-in-out'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => { navigate(`/presentation/${presentation.id}`) } }
    >
      <Card.Img variant="top" src="https://via.placeholder.com/30x10?text=" alt="Thumbnail" />
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <Card.Title>{presentation.name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default PresentationList;
