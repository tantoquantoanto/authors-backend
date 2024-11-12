import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Heart } from "lucide-react"; 
import DestinationCard from "../components/Destinations/DestinationCard"; 
import { useNavigate } from "react-router-dom"; 
import useSession from "../../hooks/useSession";

const LikedDestinationsPage = () => {
  const [likedDestinations, setLikedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const session = useSession();
  const userId = session?.userId;
  const token = localStorage.getItem("Authorization");
  const navigate = useNavigate(); 

 
  const getLikedDestinations = async () => {
    try {
      setLoading(true);
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users/${userId}/liked-destinations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch liked destinations.");
      }

      const data = await response.json();
      setLikedDestinations(data.destinations); 
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred while fetching your liked destinations.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleLikeToggle = async (destinationId) => {
    try {
      const isLiked = likedDestinations.some((dest) => dest._id === destinationId);

      if (isLiked) {
        
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/users/${userId}/like/${destinationId}`,
          { method: "DELETE", headers: { "Content-Type": "application/json" } }
        );
        
        if (response.ok) {
          setLikedDestinations(likedDestinations.filter((dest) => dest._id !== destinationId));
        }
      } else {
        
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/users/${userId}/like/${destinationId}`,
          { method: "POST", headers: { "Content-Type": "application/json" } }
        );

        if (response.ok) {
          const updatedLikedDestinations = await response.json();
          setLikedDestinations(updatedLikedDestinations.likedDestinations);
        }
      }
    } catch (error) {
      console.error("Errore nella gestione dei like:", error);
    }
  };

  
  useEffect(() => {
    if (userId) {
      getLikedDestinations();
    } else {
      navigate("/login");
    }
  }, [userId, navigate]); 

  if (loading) {
    return (
      <Container className="py-4" style={{ textAlign: "center" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <h4>Error:</h4>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2>Your Liked Destinations <Heart color="#ff0000" size={24} /></h2>
      <Row>
        {likedDestinations.length > 0 ? (
          likedDestinations.map((destination) => (
            <Col xs={12} md={4} key={destination._id} className="mb-3">
              <DestinationCard
                img={destination.img}
                name={destination.name}
                location={destination.location}
                category={destination.category}
                id={destination._id}
                isLiked={true} 
                onLikeToggle={() => handleLikeToggle(destination._id)}
              />
            </Col>
          ))
        ) : (
          <p>No liked destinations found.</p>
        )}
      </Row>
    </Container>
  );
};

export default LikedDestinationsPage;
