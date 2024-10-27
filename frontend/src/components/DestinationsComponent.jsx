import { Container, Row } from "react-bootstrap"
import DestinationCard from "./DestinationCard"
import { useEffect, useState } from "react"
import ResponsivePagination from "react-responsive-pagination";



const DestinationsComponent = () => {

    const [destinations, setDestinations] = useState([])
    console.log(destinations)
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(1);


    const getDestinationsFromApi = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/destinations?page=${page}&pageSize=${pageSize}`);
            const data = await response.json();
            setDestinations(data.destinations) ;
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error)
            
        }
        
        }
        
        useEffect(() => {
        getDestinationsFromApi()
        }, [page, pageSize])



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