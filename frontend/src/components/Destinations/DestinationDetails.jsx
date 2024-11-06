import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import DestinationsEditingModal from "../Destinations/DestinationsEditingModal";
import { DestinationsContext } from "../../../contexts/DestinationsContext";
import useSession from "../../../hooks/useSession";
import Swal from 'sweetalert2';

const DestinationDetails = () => {
  const { getSingleDestination, singleDestination, isLoading, setApprovedDestinations, setNotApprovedDestinations } =
    useContext(DestinationsContext);
  const { destinationId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("Authorization")
  const {role : userRole } = useSession();
 


  const deleteDestination = async () => {
    try {
    
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/destinations/delete/${destinationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
      
        });

        if (!response.ok) {
            throw new Error("Failed to delete destination");
        }

        const data = await response.json();


    } catch (error) {
        console.error("Update failed:", error);
    } 
};
      

  
      const updateDestinationApproval = async (isApproved) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/destinations/approve/${destinationId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json",
                   Authorization: `Bearer ${token}`
                 },
                body: JSON.stringify({ approved: isApproved })
            });
    
            if (!response.ok) {
                throw new Error(`Errore durante ${isApproved ? "l'approvazione" : "il rifiuto"} della destinazione`);
            }
    
            const data = await response.json();
    
            if (isApproved) {
                // lo aggiungo alle destinazioni approvate
                Swal.fire("Successo!", "Destinazione approvata con successo.", "success"); 
                setApprovedDestinations((prev) => [...prev, data.updatedDestination]);
                // lo tolgo da quelle non approvate filtrando quelle con diverso id
                setNotApprovedDestinations((prev) =>
                    prev.filter((dest) => dest._id !== destinationId)
                );
            } else {
               //stessa cosa al contrario
               Swal.fire("Successo!", "Destinazione scartata con successo.", "success"); 
               //ed elimino la destinazione proposta
               deleteDestination()
                setNotApprovedDestinations((prev) => [...prev, data.updatedDestination]);
                setApprovedDestinations((prev) =>
                    prev.filter((dest) => dest._id !== destinationId)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };
    
  





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
              {userRole === "admin" && (
  <>
    <Button variant="primary" className="mt-3" onClick={showEditingModal}>
      Edit Destination
    </Button>
    {!singleDestination.approved && (
      <div className="d-flex align-items-center justify-content-center gap-2">
        <Button onClick={() => updateDestinationApproval(true)} variant="success" className="mt-3"> Approve Destination </Button>
        <Button onClick={() => updateDestinationApproval(false)} variant="danger" className="mt-3"> Discard Destination </Button>
      </div>
    )}
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
