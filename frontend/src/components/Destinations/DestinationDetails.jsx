import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DestinationsEditingModal from "../Destinations/DestinationsEditingModal";
import { DestinationsContext } from "../../../contexts/DestinationsContext";

const DestinationDetails = () => {
  const { getSingleDestination, singleDestination, isLoading } = useContext(DestinationsContext);
  const { destinationId } = useParams();
  const [showModal, setShowModal] = useState(false);

  const showEditingModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  useEffect(() => {
    getSingleDestination(destinationId);
  }, [destinationId]);

 
  if (isLoading) {
    return <p>Loading...</p>; 
  }

  if (!singleDestination) {
    return <p>Destinazione non trovata.</p>; 
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col className="mx-auto">
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={singleDestination.img}
              style={{ objectFit: "cover", height: "300px" }}
            />
            <Card.Body>
              <Card.Title>{singleDestination.name}</Card.Title>
              <Card.Text> {singleDestination.location}</Card.Text>
              <Card.Text>{singleDestination.category}</Card.Text>
              <Card.Text>{singleDestination.description}</Card.Text>
              <Button variant="primary" className="mt-3" onClick={showEditingModal}>
                Edit Destination
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <DestinationsEditingModal
          show={showModal}
          handleClose={handleCloseModal}
          destination={singleDestination}
        />
      </Row>
    </Container>
  );
};

export default DestinationDetails;
