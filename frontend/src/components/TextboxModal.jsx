import React from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

function TextboxModal ({ onClose, setNewSlideElement }) {
  const [text, setText] = React.useState('');
  const [textSize, setTextSize] = React.useState({ width: '', height: '' });
  const [fontSize, setFontSize] = React.useState('1.0');
  const [textColour, setTextColour] = React.useState('#000000');
  const [fontFamily, setFontFamily] = React.useState('Arial');

  const handleSubmit = (event) => {
    event.preventDefault();
    const objectDetails = {
      objType: 'textbox',
      size: textSize,
      text,
      fontSize,
      colour: textColour,
      fontFamily
    }
    setNewSlideElement(objectDetails);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Textbox</Modal.Title>
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
          <Form.Group controlId="textboxText">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter text"
              value={text}
              onChange={e => setText(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="fontSize">
            <Form.Label>Font Size (em)</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              placeholder="Enter font size in em"
              value={fontSize}
              onChange={e => setFontSize(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="textColour">
            <Form.Label>Text Color (HEX)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter HEX color code"
              value={textColour}
              onChange={e => setTextColour(e.target.value)}
              pattern="^#([0-9A-F]{3}){1,2}$"
              title="Enter a valid HEX color code"
              required
            />
          </Form.Group>
          <Form.Group controlId="fontFamily">
            <Form.Label>Font Family</Form.Label>
            <Form.Control
              as="select"
              value={fontFamily}
              onChange={e => setFontFamily(e.target.value)}>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </Form.Control>
          </Form.Group>
          <br></br>
          <Button onClick={handleSubmit} variant="primary" type="submit">
            Create Textbox
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TextboxModal;
