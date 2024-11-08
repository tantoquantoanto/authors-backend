import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DestinationCard = ({ img, name, location, category, id }) => {
  const navigate = useNavigate();
  const [destinationId, setDestinationId] = useState(null);
  

  const onClick = () => {
    setDestinationId(id);
    navigate(`/destinations/${id}`);
  };

  return (

        <Card className="shadow-sm w-100" style={{ height: "450px" }}>
          <Card.Img
            variant="top"
            src={img}
            style={{ objectFit: "cover", height: "250px" }}
          />
          <Card.Body className="d-flex flex-column" style={{ height: "150px" }}>
            <Card.Title className="mb-2 text-truncate">{name}</Card.Title>
            <Card.Text className="text-muted mb-2 text-truncate">{location}</Card.Text>
            <Card.Text className="text-muted mb-2 text-truncate">{category}</Card.Text>
            <Button onClick={onClick} variant="primary" className="mt-auto">
              Details
            </Button>
          </Card.Body>
        </Card>
    
    
  );
};

export default DestinationCard;
