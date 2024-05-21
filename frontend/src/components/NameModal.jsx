import React from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { BACKEND_URL } from '../App';

function NameModal ({ token, onClose, currPresentations, presentationId, initialName, setStore }) {
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
      const newId = currPresentations.length === 0 ? 0 : Math.max(...currPresentations.map((p) => p.id)) + 1;
      const newPresentation = {
        id: newId,
        name: presentationName,
        description: '',
        slides: [{ id: 1, content: [] }],
        thumbnail: '',
      };
      const updatedPresentations = [...currPresentations, newPresentation];
      console.log('updated presentations:', updatedPresentations);

      await axios.put(`${BACKEND_URL}/store`, {
        store: { presentations: updatedPresentations },
      }, {
        headers: {
          Authorization: token,
        }
      });

      setStore(prevState => ({
        presentations: prevState.presentations.map(presentation =>
          presentation.id === presentationId ? { ...presentation, name: presentationName } : presentation
        ),
      }));

      setStore({ presentations: updatedPresentations });
      onClose();
    } catch (err) {
      console.error('Failed to update presentations:', err);
      alert('Error updating presentations: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Presentation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="presentationName">
            <Form.Label>Presentation Name</Form.Label>
            <Form.Control type="text" placeholder="Enter presentation name" value={presentationName} onChange={e => setPresentationName(e.target.value)} required />
          </Form.Group><br></br>
          <Button variant="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default NameModal;
