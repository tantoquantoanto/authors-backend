import { createContext, useEffect, useState } from "react";
import useSession from "../hooks/useSession";

export const DestinationsContext = createContext();

export const DestinationsProvider = ({ children }) => {
    const [allDestinations, setAllDestinations] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [singleDestination, setSingleDestination] = useState(null);
    const [approvedDestinations, setApprovedDestinations] = useState([]);
    const [notApprovedDestinations, setNotApprovedDestinations] = useState([]);
  

    const getDestinationsFromApi = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("Authorization"); 
            const url = `${import.meta.env.VITE_SERVER_BASE_URL}/destinations/?page=${page}&pageSize=${pageSize}`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch destinations");
            }

            const data = await response.json();
            const approvedData = data.destinations.filter(destination => destination.approved === true);
            const notApprovedData = data.destinations.filter(destination => destination.approved === false);
            setAllDestinations(data.destinations);
            setApprovedDestinations(approvedData);
            setNotApprovedDestinations(notApprovedData);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Failed to fetch destinations:", error.message || error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getDestinationsFromApi();
    }, [page, pageSize]);

    const getSingleDestination = async (destinationId) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/destinations/${destinationId}`);
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
    };

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

            setAllDestinations(prev => 
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
            value={{
                allDestinations,
                singleDestination,
                approvedDestinations,
                notApprovedDestinations,
                setApprovedDestinations,
                setNotApprovedDestinations,
                totalPages,
                page,
                setPage,
                isLoading,
                setIsLoading,
                pageSize,
                updateSingleDestination,
                getSingleDestination, 
            }}>
            {children}
        </DestinationsContext.Provider>
    );
};
