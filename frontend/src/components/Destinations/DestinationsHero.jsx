import { useContext } from "react";
import { DestinationsContext } from "../../../contexts/DestinationsContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../componentscss/destinationsHero.css"

const DestinationsHero = () => {
    const { destinations } = useContext(DestinationsContext);

    if (!destinations || destinations.length === 0) {
        return <p>Nessuna destinazione disponibile.</p>; 
    }

    const randomIndex = Math.floor(Math.random() * destinations.length);
    const randomDestination = destinations[randomIndex];

    return (
        <Container fluid className="destinations-hero my-4">
            <Row className="justify-content-center">
                <Col md={12} className="text-center">
                    <Card className="bg-dark text-white border-0 hero-card">
                        <Card.Img
                            src={randomDestination.img} 
                            alt={randomDestination.name}
                            className="hero-img"
                        />
                        <Card.ImgOverlay className="d-flex flex-column justify-content-center text-overlay">
                            <Card.Title className="display-3">{randomDestination.name}</Card.Title>
                            <Card.Text className="lead">
                                {randomDestination.description} 
                            </Card.Text>
                            <Button variant="primary" href={`/destinations/${randomDestination._id}`} className="hero-button">
                                Scopri di più
                            </Button>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default DestinationsHero;
