import { Container, Row, Col } from "react-bootstrap";
import DestinationCard from "./components/Destinations/DestinationCard";
import { useContext } from "react";
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
    pageSize,
    approvedDestinations,
    notApprovedDestinations,
    totalPages,
  } = useContext(DestinationsContext);

  const session = useSession();
  const isAdmin = session.role === "admin";

  return (
    <>
      <NavBar />
      {!isAdmin && <DestinationsHero />}
      <Container className="py-4">
        <Row>
          {isAdmin ? (
            <>
            
              <Col md={12}>
                <h2>Destinazioni da approvare</h2>
                <Row>
                  {notApprovedDestinations.map((destination) => (
                    <Col xs={12} md = {3} key={destination._id} className="mb-3">
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
              </Col>
            </>
          ) : (
            <>
              <h2>Destinazioni Approvate</h2>
              <Row>
                {approvedDestinations.map((destination) => (
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
