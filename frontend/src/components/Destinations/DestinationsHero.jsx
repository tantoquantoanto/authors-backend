import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../componentscss/destinationsHero.css";
import { useAllDestinations } from "../../../hooks/useAllDestinations";

const DestinationsHero = () => {
    const { allDestinations, loading, error } = useAllDestinations();
    const [randomDestination, setRandomDestination] = useState(null);

    useEffect(() => {
        if (allDestinations && allDestinations.length > 0) {
            const randomIndex = Math.floor(Math.random() * allDestinations.length);
            setRandomDestination(allDestinations[randomIndex]);
        }
    }, [allDestinations]);

    if (loading) {
        return (
            <Container className="destinations-hero my-4">
                <Row className="justify-content-center">
                    <Col md={12} className="text-center">
                        <h3>Loading destinations...</h3>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="destinations-hero my-4">
                <Row className="justify-content-center">
                    <Col md={12} className="text-center">
                        <h3>Error loading destinations: {error}</h3>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (!randomDestination) {
        return (
            <Container className="destinations-hero my-4">
                <Row className="justify-content-center">
                    <Col md={12} className="text-center">
                        <h3>No destinations available</h3>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="destinations-hero my-4">
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
