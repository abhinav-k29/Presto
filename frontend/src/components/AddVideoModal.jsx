import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const AddVideoModal = ({ onClose, setNewSlideElement }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [autoplay, setAutoplay] = useState(false);
  const [videoSize, setVideoSize] = useState({ width: '', height: '' });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!videoUrl.match(/^(https:\/\/www\.youtube\.com\/watch\?v=|https:\/\/youtu\.be\/)/)) {
      alert('Please enter a valid YouTube URL.');
      return;
    }
    if (parseInt(videoSize.width, 10) < 0 || parseInt(videoSize.width, 10) > 100 || parseInt(videoSize.height, 10) < 0 || parseInt(videoSize.height, 10) > 100) {
      alert('Please enter valid dimensions as percentages (0% - 100%).');
      return;
    }
    const objectDetails = {
      objType: 'video',
      size: videoSize,
      videoUrl,
      autoplay,
    };

    setNewSlideElement(objectDetails);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Video to Slide</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="videoSize">
            <Form.Label>Video Size (as percentage of slide)</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Width"
                value={videoSize.width.replace('%', '')}
                onChange={e => setVideoSize({ ...videoSize, width: `${e.target.value}%` })}
                required
                min="0"
                max="100"
              />
              <InputGroup.Text>%</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Height"
                value={videoSize.height.replace('%', '')}
                onChange={e => setVideoSize({ ...videoSize, height: `${e.target.value}%` })}
                required
                min="0"
                max="100"
              />
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>YouTube Video URL</Form.Label>
            <Form.Control
              type="text"
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="Autoplay"
              checked={autoplay}
              onChange={e => setAutoplay(e.target.checked)}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit">Add Video</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddVideoModal;
