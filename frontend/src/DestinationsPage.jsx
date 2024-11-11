import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useApprovedDestinations } from '../hooks/useApprovedDestinations';
import { useNotApprovedDestinations } from '../hooks/useNotApprovedDestinations';
import NavBar from './components/NavBar';
import DestinationCard from './components/Destinations/DestinationCard';
import DestinationsHero from './components/Destinations/DestinationsHero';
import Footer from './components/Footer';
import ResponsivePagination from 'react-responsive-pagination';
import useSession from '../hooks/useSession';

const DestinationsPage = () => {
  const { approvedDestinations, approvedPage, setApprovedPage, totalApprovedPages, searchApprovedDestinationsByName, resetApprovedDestinations } = useApprovedDestinations();
  const { notApprovedDestinations, notApprovedPage, setNotApprovedPage, totalNotApprovedPages, searchNotApprovedDestinationsByName, resetNotApprovedDestinations } = useNotApprovedDestinations();

  const session = useSession();
  const isAdmin = session.role === 'admin';
  const [showApproved, setShowApproved] = useState(true);  

 
  const handleSearch = (name) => {

    if (showApproved) {
      resetApprovedDestinations();
      searchApprovedDestinationsByName(name); 
    } else {
      resetNotApprovedDestinations();
      searchNotApprovedDestinationsByName(name); 
    }
  };

  return (
    <>
      <NavBar setShowApproved={setShowApproved} onSearch={handleSearch} /> 
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
                <ResponsivePagination
                  current={showApproved ? approvedPage : notApprovedPage} // Paginazione condizionale
                  total={showApproved ? totalApprovedPages : totalNotApprovedPages}
                  onPageChange={showApproved ? setApprovedPage : setNotApprovedPage} // Paginazione condizionale
                />
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
      </Container>
      <Footer />
    </>
  );
};

export default DestinationsPage;
