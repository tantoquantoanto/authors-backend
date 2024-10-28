import { Container, Row } from "react-bootstrap"
import DestinationCard from "./DestinationCard"
import { useContext, useEffect, useState } from "react"
import ResponsivePagination from "react-responsive-pagination";
import { DestinationsContext } from "../../contexts/DestinationsContext";



const DestinationsComponent = () => {

  const {page, setPage, destinations, isLoading, setIsLoading, totalPages, pageSize} = useContext(DestinationsContext)



return (
    <> 
    <Container className="py-4">
    <Row>
      {destinations.map((destination) => (
        <DestinationCard
          key={destination._id}
          img={destination.img}
          name={destination.name}
          location={destination.location}
          category={destination.category}
          description={destination.description}
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
    </>
)

}
export default DestinationsComponent