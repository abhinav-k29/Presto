import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function AddCodeModal ({ onClose, setNewSlideElement }) {
  const [codeData, setCodeData] = useState({
    code: '',
    size: { width: '', height: '' },
    fontSize: 1.0,
    language: ''
  });

  const detectLanguage = (code) => {
    if (code.includes('def') || code.includes('import')) {
      return 'python';
    } else if (code.includes('#include') || code.includes('int main()')) {
      return 'c';
    } else {
      return 'javascript';
    }
  };

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    const detectedLanguage = detectLanguage(newCode);
    setCodeData(prev => ({ ...prev, code: newCode, language: detectedLanguage }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const objectDetails = {
      objType: 'code',
      size: codeData.size,
      fontSize: codeData.fontSize,
      code: codeData.code,
      language: codeData.language
    }
    setNewSlideElement(objectDetails);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Code Block</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="codeSize">
            <Form.Label>Textarea Size</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Width"
                value={codeData.size.width}
                onChange={e => setCodeData(prev => ({ ...prev, size: { ...prev.size, width: e.target.value } }))}
                required
                min="0"
                max="100"
              />
            <InputGroup.Text>%</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Height"
                value={codeData.size.height}
                onChange={e => setCodeData(prev => ({ ...prev, size: { ...prev.size, height: e.target.value } }))}
                required
                min="0"
                max="100"
              />
            <InputGroup.Text>%</InputGroup.Text>

            </InputGroup>
          </Form.Group>
          <Form.Group controlId="fontSize">
            <Form.Label>Font Size (em)</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              value={codeData.fontSize}
              onChange={e => setCodeData(prev => ({ ...prev, fontSize: parseFloat(e.target.value) }))}
              required
            />
          </Form.Group>
          <Form.Group controlId="code">
            <Form.Label>Code</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              style={{ fontFamily: 'monospace', fontSize: `${codeData.fontSize}em` }}
              value={codeData.code}
              onChange={handleCodeChange}
              required
            />
          </Form.Group>
          <SyntaxHighlighter language={codeData.language} style={docco}>
            {codeData.code}
          </SyntaxHighlighter>
          <Button variant="primary" type="submit">
            Add Code Block
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddCodeModal;
