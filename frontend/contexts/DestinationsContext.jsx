import { createContext, useEffect, useState } from "react";

export const DestinationsContext = createContext()

export const DestinationsProvider = ({children}) => {
    const [destinations, setDestinations] = useState({});
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] =useState(false)
    const [singleDestination, setSingleDestination] = useState(null);

    const getDestinationsFromApi = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/destinations/?page=${page}&pageSize=${pageSize}`)
            const data = await response.json()
            setDestinations(data.destinations);
            setTotalPages(data.totalPages)

        } catch (error) {
            console.error("Failed to fetch destinations:", error);
        }
        finally{
            setIsLoading(false)
        }
    }

useEffect(() => {
getDestinationsFromApi()
}, [page])


  const getSingleDestination = async (destinationId) => {
    try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/destinations/${destinationId}`)
        const data = await response.json();
        if (response.ok) {
            setSingleDestination(data.destination);
          } else {
            console.error("Error fetching destination:", data.message);
          }
        } catch (error) {
          console.error("Error fetching single destination:", error);
        } finally {
          setIsLoading(false);
        }
  }

  const updateSingleDestination = async (destinationId, updatedData) => {
    try {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/destinations/update/${destinationId}`, {
            method: "PATCH",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData);
        })
        const data = await response.json();
      if (response.ok) {
        setSelectedDestination(data.updatedDestination);
        getDestinationsFromApi(); // To refresh the list with updated details
      } else {
        console.error("Error updating destination:", data.message);
      }
    } catch (error) {
      console.error("Error updating destination:", error);
    } finally {
      setIsLoading(false);
    }
        
  }


}