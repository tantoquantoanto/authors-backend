import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import DestinationsHero from "../components/Destinations/DestinationsHero";
import { Col, Container, Row } from "react-bootstrap";
import DestinationCard from "../components/Destinations/DestinationCard";
import ResponsivePagination from "react-responsive-pagination";
import Footer from "../components/Footer";
import { useAllDestinations } from "../../hooks/useAllDestinations";

const OpenDestinationsPage = () => {
  const { allDestinations, page, setPage, totalPages, error, loading, searchDestinationsByName } = useAllDestinations();
  const [searchResults, setSearchResults] = useState(null);
  
 
  const handleSearch = async (name) => {
    const results = await searchDestinationsByName(name); 
    setSearchResults(results); 
  };

 
  const destinationsToDisplay = searchResults || allDestinations; 

  return (
    <>
      <NavBar onSearch={handleSearch} /> 
      <DestinationsHero />
      <Container className="py-4">
        <Row>
          {destinationsToDisplay.map((destination) => (
            <Col md={4} key={destination._id} className="mb-3">
              <DestinationCard
                img={destination.img}
                name={destination.name}
                location={destination.location}
                category={destination.category}
                id={destination._id}
              />
            </Col>
          ))}
        </Row>
        <Row className="mt-4 justify-content-center">
          <ResponsivePagination
            current={page}
            total={totalPages}
            onPageChange={setPage}
          />
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default OpenDestinationsPage;
