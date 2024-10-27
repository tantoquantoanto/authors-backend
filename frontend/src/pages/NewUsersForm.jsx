import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const NewUsersForm = () => {
  const [formState, setFormState] = useState({});
  const [file, setFile] = useState(null);

  const onChangeFile = (e) =>{
    setFile(e.target.files[0])
  }


  const uploadFile = async (fileToUpload) => {
    const fileData = new FormData();
    fileData.append("img", fileToUpload);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users/upload`,{
        method: "POST",
        body: fileData
      })
      return await response.json()
    } catch (error) {
      console.log(error)
      
    }



  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
  e.preventDefault();

  if(file) {
    try {
      const uploadedFile = await uploadFile(file);
      const postFormState = {
        ...formState,
        img: uploadedFile.img
      }
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postFormState)
      })
      return await response.json();
      
    } catch (error) {
      console.log(error)
    }
  }

  }

  return (
    <>
      <Form onSubmit={onSubmit} className="mt-5">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleInput}
              type="text"
              name="name"
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              onChange={handleInput}
              type="text"
              name="surname"
              placeholder="Enter surname"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleInput}
            type="email"
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={handleInput}
            type="text"
            name="username"
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleInput}
            type="password"
            name="password"
            placeholder="Enter password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" onChange={handleInput}>
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formImg">
          <Form.Label>IMG</Form.Label>
          <Form.Control
            onChange={onChangeFile}
            type="file"
            name="img"
            placeholder="Enter img Url"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default NewUsersForm;
