import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; 

const EditReviewModal = ({ show, onHide, review, onUpdate }) => {
  const [rating, setRating] = useState(review.rating || 1);
  const [comment, setComment] = useState(review.comment || "");

  const handleSave = () => {
    const updatedData = { rating, comment };
    onUpdate(review._id, updatedData);  
    onHide();  
  };

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [review]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Recensione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formRating">
            <Form.Label>Valutazione</Form.Label>
            <Form.Control
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
            />
          </Form.Group>
          <Form.Group controlId="formComment">
            <Form.Label>Commento</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annulla
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Salva
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditReviewModal;
