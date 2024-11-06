import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../componentscss/addDestination.css";
import NavBar from "../NavBar";
import Footer from "../Footer";

const NewDestinationsForm = () => {
  const [formState, setFormState] = useState({});
  const [file, setFile] = useState(null);

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const uploadFile = async (fileToUpload) => {
    const fileData = new FormData();
    fileData.append("img", fileToUpload);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/destinations/upload`,
        {
          method: "POST",
          body: fileData,
        }
      );
      return await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitDestination = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const uploadedFile = await uploadFile(file);
        const postFormState = {
          ...formState,
          img: uploadedFile.img,
        };
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/destinations/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postFormState),
          }
        );
        return await response.json();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
    <NavBar/>
      <Container className="my-5">
        <div className="image-header mb-4">
          <img
            src="https://www.triptherapy.net/images/easyblog_articles/535/ganapathy-kumar-7782WXBriyM-unsplash.jpg"
            alt="Add New Destination"
            className="img-fluid w-100"
          />
          <h1>Aggiungi una Nuova Destinazione</h1>
        </div>

        <Form encType="multipart/form-data" className="mt-4">
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                onChange={onChangeInput}
                type="text"
                name="name"
                placeholder="Inserisci il nome della destinazione"
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formLocation">
              <Form.Label>Luogo</Form.Label>
              <Form.Control
                onChange={onChangeInput}
                type="text"
                name="location"
                placeholder="Inserisci la località"
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              onChange={onChangeInput}
              as="textarea"
              name="description"
              placeholder="Descrivi la destinazione"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              onChange={onChangeInput}
              type="text"
              name="category"
              placeholder="Inserisci la categoria"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImages">
            <Form.Label>Immagine</Form.Label>
            <Form.Control
              type="file"
              name="img"
              onChange={onChangeFile}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-2">
            Aggiungi Destinazione
          </Button>
        </Form>
      </Container>
      <Footer/>
    </>
  );
};

export default NewDestinationsForm;
