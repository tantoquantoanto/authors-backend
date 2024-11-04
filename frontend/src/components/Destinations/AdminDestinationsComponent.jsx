import { useContext, useEffect, useState } from "react"
import { DestinationsContext } from "../../../contexts/DestinationsContext"
import NavBar from "../NavBar";
import { Container, Row } from "react-bootstrap";
import DestinationCard from "./DestinationCard";
import ResponsivePagination from "react-responsive-pagination";
import Footer from "../Footer";

const AdminDestinationsComponent = () => {
    
   const {notApprovedDestinations, page, setPage, totalPages} = useContext(DestinationsContext)

        return(
            <>
      <NavBar />
      <Container className="py-4">
        <Row>
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
        </Row>
        <Row className="mt-4 justify-content-center">
          <ResponsivePagination
            current={page}
            total={totalPages}
            onPageChange={setPage}
          />
        </Row>
      </Container>
      <Footer/>
    </>
        )


}

export default AdminDestinationsComponent