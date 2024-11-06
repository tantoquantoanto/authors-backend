import { useContext, useEffect, useState } from "react";
import { DestinationsContext } from "../../contexts/DestinationsContext";
import useSession from "../../hooks/useSession";
import NavBar from "../components/NavBar";
import DestinationsHero from "../components/Destinations/DestinationsHero";
import { Col, Container, Row } from "react-bootstrap";
import DestinationCard from "../components/Destinations/DestinationCard";
import ResponsivePagination from "react-responsive-pagination";
import Footer from "../components/Footer";

const OpenDestinationsPage = () => {
   
    const {page, setPage, totalPages, allDestinations} = useContext(DestinationsContext);
    const destinations = allDestinations;




return (
    <>
      <NavBar/>
      <DestinationsHero 
      />
      <Container className="py-4">
              <Row>
                {destinations.map((destination) => (
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

}

export default OpenDestinationsPage;