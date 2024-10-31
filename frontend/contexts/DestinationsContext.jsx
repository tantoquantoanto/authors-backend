import { createContext, useEffect, useState } from "react";

export const DestinationsContext = createContext()

export const DestinationsProvider = ({children}) => {
    const [destinations, setDestinations] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] =useState(false)
    const [singleDestination, setSingleDestination] = useState(null);

    const getDestinationsFromApi = async () => {
        try {
            setIsLoading(true);
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/destinations/?page=${page}&pageSize=${pageSize}`;
            console.log(url); 
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error("Failed to fetch destinations");
            }
    
            const data = await response.json();
            console.log(data); 
            setDestinations(data.destinations);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Failed to fetch destinations:", error.message || error);
        } finally {
            setIsLoading(false);
        }
    }
    

    

useEffect(() => {
getDestinationsFromApi()
}, [page, pageSize])


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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });
      
      if (!response.ok) {
        throw new Error("Failed to update destination");
      }
  
      const data = await response.json();
  
      setDestinations(prev => 
        prev.map(dest => dest._id === destinationId ? data.destination : dest)
      );
  
      await getSingleDestination(destinationId);
  
      return data.destination;
  
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
<DestinationsContext.Provider
value={{destinations, singleDestination, totalPages, page, setPage, isLoading, setIsLoading, pageSize, updateSingleDestination, getSingleDestination}}>
    {children}
</DestinationsContext.Provider>
    
  )


}