import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

function AddImageModal ({ onClose, setNewSlideElement }) {
  const [textSize, setTextSize] = React.useState({ width: '', height: '' });
  const [imageData, setImageData] = React.useState({
    imageUrl: '',
    imageFile: null,
    size: { width: '', height: '' },
    altText: ''
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (loadEvent) {
        setImageData(prev => ({ ...prev, imageUrl: loadEvent.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const objectDetails = {
      objType: 'image',
      imageUrl: imageData.imageUrl,
      imageFile: imageData.imageFile,
      size: textSize,
      altText: imageData.altText
    }
    setNewSlideElement(objectDetails);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="textboxSize">
            <Form.Label>Textbox Size</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Width"
                value={textSize.width.replace('%', '')}
                onChange={e => setTextSize({ ...textSize, width: `${e.target.value}%` })}
                required
                min="0"
                max="100"
              />
              <InputGroup.Text>%</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Height"
                value={textSize.height.replace('%', '')}
                onChange={e => setTextSize({ ...textSize, height: `${e.target.value}%` })}
                required
                min="0"
                max="100"
              />
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="imageURL">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="Enter image URL"
              value={imageData.imageUrl}
              onChange={e => setImageData(prev => ({ ...prev, imageUrl: e.target.value }))}
            />
          </Form.Group>
          <Form.Group controlId="imageFile" className="mb-3">
            <Form.Label>Or upload an image file</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
          <Form.Group controlId="altText">
            <Form.Label>Alt Text (for accessibility)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter alt text for the image"
              value={imageData.altText}
              onChange={e => setImageData(prev => ({ ...prev, altText: e.target.value }))}
              required
            />
          </Form.Group>
          <br></br>
          <Button onClick={handleSubmit} variant="primary" type="submit">
            Add Image
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default AddImageModal;
