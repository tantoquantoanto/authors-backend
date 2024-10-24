import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const NewDestinationsForm = () => {
  const [formState, setFormState] = useState({
    images: [], // Array per le immagini
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleImagesInput = (e) => {
    const { value } = e.target;
    setFormState({
      ...formState,
      images: [...formState.images, value], // Aggiunge un'immagine all'array
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/destinations/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={onSubmit} className="mt-5">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleInput}
            type="text"
            name="name"
            placeholder="Enter destination name"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={handleInput}
            type="text"
            name="location"
            placeholder="Enter location"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          onChange={handleInput}
          as="textarea"
          name="description"
          placeholder="Enter description"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          onChange={handleInput}
          type="text"
          name="category"
          placeholder="Enter category"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImages">
        <Form.Label>Images (URL)</Form.Label>
        <Form.Control
          onChange={handleImagesInput}
          type="text"
          name="images"
          placeholder="Enter image URL"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewDestinationsForm;
