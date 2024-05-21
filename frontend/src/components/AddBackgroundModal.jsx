import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddBackgroundModal ({ token, onClose, currentSlideBackground, defaultSlideBackground, onSave }) {
  const [currentBackground, setCurrentBackground] = React.useState(currentSlideBackground);
  const [defaultBackgroundColor, setDefaultBackgroundColor] = React.useState(defaultSlideBackground);

  const handleCurrentBackgroundChange = (color) => {
    setCurrentBackground(color.hex);
  };

  const handleDefaultBackgroundChange = (color) => {
    setDefaultBackgroundColor(color.hex);
  };

  const handleSave = async () => {
    onSave(currentBackground);
    onClose();
  };

  return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update Background</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="currentColorInput">Current Slide Color</Form.Label>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        defaultValue={currentBackground}
                        onChange={handleCurrentBackgroundChange}
                        title="Choose your color"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="defaultColorInput">Default Slide Color</Form.Label>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        defaultValue={defaultBackgroundColor}
                        onChange={handleDefaultBackgroundChange}
                        title="Choose your color"
                    />
                </Form.Group>
            </Form>
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
            </Modal.Footer>
        </Modal>
  );
}

export default AddBackgroundModal;
