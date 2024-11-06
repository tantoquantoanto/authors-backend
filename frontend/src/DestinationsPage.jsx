import { Container, Row, Col, Button } from "react-bootstrap";
import DestinationCard from "./components/Destinations/DestinationCard";
import { useContext, useState } from "react";
import { DestinationsContext } from "../contexts/DestinationsContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import DestinationsHero from "./components/Destinations/DestinationsHero";
import useSession from "../hooks/useSession";
import ResponsivePagination from "react-responsive-pagination";

const DestinationsPage = () => {
  const {
    approvedDestinations,
    notApprovedDestinations,
    page,
    setPage, 
    totalPages, 
  } = useContext(DestinationsContext);
  

  const session = useSession();
  const isAdmin = session.role === "admin";
  const [showApproved, setShowApproved] = useState(true);  

 const getDestinationsWithToken = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/destinations/`)
    
  } catch (error) {
    
  }
 }



  return (
    <>
      <NavBar 
      setShowApproved = {setShowApproved}
      />
      {!isAdmin && <DestinationsHero />}
      <Container className="py-4">
        <Row>
          {isAdmin ? (
            <>
              <Col md={12}>
               
                <h2>{showApproved ? "Destinazioni Approvate" : "Destinazioni Non Approvate"}</h2>
                <Row>
                  {(showApproved ? approvedDestinations : notApprovedDestinations).map((destination) => (
                    <Col xs={12} md={4} key={destination._id} className="mb-3">
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
              <Col md={12}>
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
              </Col>
            </>
          )}
        </Row>
        <ResponsivePagination
                  current={page}
                  total={totalPages}
                  onPageChange={setPage}
                />
      </Container>
      <Footer />
    </>
  );
};

export default DestinationsPage;
