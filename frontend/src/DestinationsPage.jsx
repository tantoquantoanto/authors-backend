import { Container, Row } from "react-bootstrap";
import DestinationCard from "./components/Destinations/DestinationCard";
import { useContext, useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { DestinationsContext } from "../contexts/DestinationsContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import DestinationsHero from "./components/Destinations/DestinationsHero";
import useSession from "../hooks/useSession";

const DestinationsPage = () => {
  const {
    page,
    setPage,
    approvedDestinations,
    notApprovedDestinations,
    isLoading,
    setIsLoading,
    totalPages,
    pageSize,
  } = useContext(DestinationsContext);

const session = useSession();
const isAdmin = session.role === "admin";
console.log(session);

  return (
    <>
      <NavBar />
      {!isAdmin && <DestinationsHero />}
      <Container className="py-4">
        <Row>
          {isAdmin ? (
            <>
              <h2>Destinazioni Approvate</h2>
              {approvedDestinations.map((destination) => (
                <DestinationCard
                  key={destination._id}
                  img={destination.img}
                  name={destination.name}
                  location={destination.location}
                  category={destination.category}
                  id={destination._id}
                />
              ))}

              <h2>Destinazioni Non Approvate</h2>
              {notApprovedDestinations.map((destination) => (
                <DestinationCard
                  key={destination._id}
                  img={destination.img}
                  name={destination.name}
                  location={destination.location}
                  category={destination.category}
                  id={destination._id}
                />
              ))}
            </>
          ) : (
            <>
              <h2>Destinazioni Approvate</h2>
              {approvedDestinations.map((destination) => (
                <DestinationCard
                  key={destination._id}
                  img={destination.img}
                  name={destination.name}
                  location={destination.location}
                  category={destination.category}
                  id={destination._id}
                />
              ))}
            </>
          )}
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
