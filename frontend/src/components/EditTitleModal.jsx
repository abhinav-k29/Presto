import React from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { BACKEND_URL } from '../App';

function EditTitleModal ({ token, onClose, currPresentations, presentationId, initialName, slides }) {
  const [presentationName, setPresentationName] = React.useState(initialName);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!presentationName) {
      alert('The presentation name cannot be empty.');
      return;
    }
    const trimmedName = presentationName.trim();

    if (trimmedName.length === 0) {
      alert('The presentation name cannot be empty.');
      return;
    }

    try {
      const newDetails = {
        id: parseInt(presentationId),
        name: presentationName,
        description: '',
        slides,
        thumbnail: '',
      };

      const updatedPresentations = currPresentations.presentations.map(presentation => {
        if (presentation.id === parseInt(presentationId)) {
          return { ...presentation, ...newDetails };
        }
        return presentation;
      });

      await axios.put(`${BACKEND_URL}/store`, {
        store: { presentations: updatedPresentations },
      }, {
        headers: {
          Authorization: token,
        }
      });

      onClose();
    } catch (err) {
      console.error('Failed to update presentations:', err);
      alert('Error updating presentations: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleInputChange = (e) => {
    const newName = e.target.value;
    if (newName.length > 0) {
      setPresentationName(newName);
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="presentationName">
            <Form.Label>New Title:</Form.Label>
            <Form.Control type="text" placeholder="Enter presentation name" value={presentationName} onChange={handleInputChange} required />
          </Form.Group><br></br>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default EditTitleModal;
