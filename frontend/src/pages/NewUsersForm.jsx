import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const NewUsersForm = () => {
  const [formState, setFormState] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/create`,
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default NewUsersForm;
