import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard"; 
import EditReviewModal from "./EditReviewModal"; 
import useSession from "../../../hooks/useSession";

const UserReviewsList = () => {
  const [myReviews, setMyReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null); 
  const session = useSession();
  const token = localStorage.getItem("Authorization");
  const userId = session ? session.userId : null;

  const getMyReviews = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log("Oops, something went wrong");
        return;
      }

      const data = await response.json();
      console.log(data);

      // Filtro le recensioni per l'utente corrente
      const myOwnReviews = data.data.filter(review => review.user && review.user._id === userId);
      if(myOwnReviews.length === 0){
        console.log("non hai lasciato nessuna recensione")
      }
      setMyReviews(myOwnReviews);
    } catch (error) {
      console.error("Something went wrong while fetching your reviews", error.message || error);
    }
  };

  useEffect(() => {
    if (userId && token) {
      getMyReviews();
    }
  }, [userId, token]);

  const onDelete = async (reviewId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/reviews/delete/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      setMyReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
      console.log('Recensione eliminata con successo');
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const onUpdate = async (reviewId, updatedData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/reviews/update/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update review');
      }

      const updatedReview = await response.json();
      setMyReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === reviewId ? { ...review, ...updatedReview } : review
        )
      );
      console.log('Recensione aggiornata con successo');
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);  
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReview(null); 
  };

  return (
    <div>
      <h2>Le tue recensioni</h2>
      {myReviews.length > 0 ? (
        myReviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            onEditReview={handleEditReview}
            onDeleteReview={onDelete}
          />
        ))
      ) : (
        <p>Non hai ancora recensioni.</p>
      )}

      {/* Modale per modificare recensione */}
      <EditReviewModal
        show={showModal}
        onHide={handleCloseModal}
        review={selectedReview}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default UserReviewsList;
