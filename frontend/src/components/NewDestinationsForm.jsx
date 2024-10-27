import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const NewDestinationsForm = () => {
  const [formState, setFormState] = useState({});
  const [file, setFile] = useState(null);



  const onChangeFile = (e) => {
    setFile(e.target.files[0])
  }

  const onChangeInput = (e) => {
    const {name, value} = e.target;
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const uploadFile = async (fileToUpload) => {
    const fileData = new FormData();
    fileData.append("img", fileToUpload)

    try {
      const response = await fetch( `${
        import.meta.env.VITE_SERVER_BASE_URL}/destinations/upload`, {
          method: "POST",
          body: fileData
        })
        return await response.json()
      
    } catch (error) {
      console.log(error.message)
    }
  };


  const submitDestination = async (e) => {
    e.preventDefault();

    if(file){
      try {
        const uploadedFile = await uploadFile(file);
        const postFormState = {
          ...formState,
          img: uploadedFile.img
        }
        const response = await fetch(`${
        import.meta.env.VITE_SERVER_BASE_URL}/destinations/create`, {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(postFormState)
        })
        return await response.json()
        
      } catch (error) {
        console.log(error.message);
        
      }
    }

  }

  return (
    <Form encType="multipart/form-data" className="mt-5" onSubmit={submitDestination} >
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={onChangeInput}
            type="text"
            name="name"
            placeholder="Enter destination name"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
          onChange={onChangeInput}
            type="text"
            name="location"
            placeholder="Enter location"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
        onChange={onChangeInput}
          as="textarea"
          name="description"
          placeholder="Enter description"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
        onChange={onChangeInput}
          type="text"
          name="category"
          placeholder="Enter category"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formImages">
        <Form.Label>Images (URL)</Form.Label>
        <Form.Control type="file" name="img" placeholder="Enter image URL" onChange={onChangeFile} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewDestinationsForm;