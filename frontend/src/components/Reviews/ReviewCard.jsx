import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Edit, Trash } from 'lucide-react'; 

const ReviewCard = ({ review, onDeleteReview, onEditReview }) => {
  return (
    <Col sm={12} md={6} lg={4} className="mb-4">
      <Card className="shadow-sm h-100">
        <Card.Body>
          <Card.Title className="text-primary">
            {review.destination.name}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Rating: {review.rating} / 5
          </Card.Subtitle>
          <Card.Text>{review.comment}</Card.Text>
          
          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onEditReview(review)} // Apre il modale di modifica
            >
              <Edit size={16} /> Modifica 
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDeleteReview(review._id)} // Esegue la cancellazione
            >
              <Trash size={16} /> Elimina 
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ReviewCard;
