import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DestinationsEditingModal from "../Destinations/DestinationsEditingModal";
import { DestinationsContext } from "../../../contexts/DestinationsContext";

const DestinationDetails = () => {
  const { getSingleDestination, singleDestination, isLoading, setApprovedDestinations, setNotApprovedDestinations } =
    useContext(DestinationsContext);
  const { destinationId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const[editable, setEditable] = useState(false);
  const [approval, setApproval] = useState(false);


  const handleApproval = async () => {
      }
  
      const updateDestinationApproval = async (isApproved) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/destinations/approve/${destinationId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ approved: isApproved })
            });
    
            if (!response.ok) {
                throw new Error(`Errore durante ${isApproved ? "l'approvazione" : "il rifiuto"} della destinazione`);
            }
    
            const data = await response.json();
    
            if (isApproved) {
                // lo aggiungo alle destinazioni approvate
                setApprovedDestinations((prev) => [...prev, data.updatedDestination]);
                // lo tolgo da quelle non approvate filtrando quelle con diverso id
                setNotApprovedDestinations((prev) =>
                    prev.filter((dest) => dest._id !== destinationId)
                );
            } else {
               //stessa cosa al contrario
                setNotApprovedDestinations((prev) => [...prev, data.updatedDestination]);
                setApprovedDestinations((prev) =>
                    prev.filter((dest) => dest._id !== destinationId)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };
    
  



  const toggleEditButton = (user) => {
    if(user ==="admin") {
      setEditable(true);
    } else {
      setEditable(false);
    }

  }

  const showEditingModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
              {singleDestination.reviews &&
                singleDestination.reviews.length > 0 &&
                singleDestination.reviews[0].comment && (
                  <Card.Text>{singleDestination.reviews[0].comment} </Card.Text>
                )}
              <Button
                variant="primary"
                className="mt-3"
                onClick={showEditingModal}
              >
                Edit Destination
              </Button>
              {!singleDestination.approved && (
                <>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                  <Button onClick={() => updateDestinationApproval(true)} variant="success" className="mt-3"> Approve Destination </Button>
                  <Button onClick={() => updateDestinationApproval(false)} variant="danger" className="mt-3"> Discard Destination </Button>
                  </div>
                </>
              )}
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
