import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import ClipLoader from "react-spinners/ClipLoader";


const DestinationsEditingModal = ({ show, handleClose, destination }) => {
  const [formState, setFormState] = useState({
    name: destination.name,
    description: destination.description,
    location: destination.location,
    category: destination.category,
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("img", file);

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/destinations/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Failed to upload image");

    const data = await response.json();
    console.log(data.img);
    return data.img;
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = destination.img;

    if (file) {
      try {
        setIsLoading(true);
        imageUrl = await uploadFile(file);
      } catch (error) {
        console.error("Image upload failed:", error);
        return;
      }
    }

    const updatedData = { ...formState, img: imageUrl };

    try {
        setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/destinations/update/${destination._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update destination");

      const result = await response.json();
      console.log("Destination updated:", result);
      handleClose();
    } catch (error) {
      console.error("Update failed:", error);
    }
    finally{
        setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Destinazione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       {isLoading ? (
          <div className="d-flex justify-content-center">
            <ClipLoader color="#007bff" loading={isLoading} size={50} />
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDestinationName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDestinationLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formState.location}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDestinationCategory">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formState.category}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDestinationDescription">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formState.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDestinationImage">
              <Form.Label>Immagine</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Salva modifiche
            </Button>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DestinationsEditingModal;
