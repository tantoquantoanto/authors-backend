import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DestinationsEditingModal from "./DestinationsEditingModal";

const DestinationDetails = () => {
  const [destination, setDestination] = useState(null);
  const { destinationId } = useParams();
  const [showModal, setShowModal] = useState(false);

  const showEditingModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }
  

  const getSingleDestinationFromApi = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/destinations/${destinationId}`);
      const data = await response.json();

      
      if (response.ok) {
        setDestination(data.destination); 
        console.log(data.destination);
      } else {
        console.error(data.message); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleDestinationFromApi();
  }, [destinationId]);

  
  if (!destination) {
    return <p>Loading...</p>; 
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col className="mx-auto">
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={destination.img}
              style={{ objectFit: "cover", height: "300px" }}
            />
            <Card.Body>
              <Card.Title>{destination.name}</Card.Title>
              <Card.Text>Location: {destination.location}</Card.Text>
              <Card.Text>Category: {destination.category}</Card.Text>
              <Card.Text>Description: {destination.description}</Card.Text>
              <Button variant="primary" className="mt-3" onClick={showEditingModal}>
                Edit User
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <DestinationsEditingModal
        show = {showModal}
        handleClose={handleCloseModal}
        destination={destination}


        />
      </Row>
    </Container>
  );
};

export default DestinationDetails;
