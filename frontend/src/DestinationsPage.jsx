import { Container, Row } from "react-bootstrap";
import DestinationCard from "./components/Destinations/DestinationCard";
import { useContext, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { DestinationsContext } from "../contexts/DestinationsContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import DestinationsHero from "./components/Destinations/DestinationsHero";

const DestinationsPage = () => {
  const {
    page,
    setPage,
    destinations,
    isLoading,
    setIsLoading,
    totalPages,
    pageSize,
  } = useContext(DestinationsContext);

  return (
    <>
      <NavBar />
      <DestinationsHero />
      <Container className="py-4">
        <Row>
          {destinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              img={destination.img}
              name={destination.name}
              location={destination.location}
              category={destination.category}
              id={destination._id}
            />
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
export default DestinationsPage;
