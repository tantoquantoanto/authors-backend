import { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useSession from "../../hooks/useSession";

const UpdateUserPage = () => {
  const { userId } = useParams(); 
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ 
    name: "",
    surname: "",
    email: "",
    username: "",
    role: ""
  });
  const [file, setFile] = useState(null);  // Stato per il file
  const navigate = useNavigate(); 
  const session = useSession(); 
  const token = session ? localStorage.getItem("Authorization") : null; 

  const getUserFromApi = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/${userId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`, 
          },
        }
      );
      const data = await response.json();
      setUser(data.user);
      setFormData({
        name: data.user.name,
        surname: data.user.surname,
        email: data.user.email,
        username: data.user.username,
        role: data.user.role
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserFromApi();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Funzione per gestire il cambio del file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Funzione per caricare l'immagine
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("img", file);

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_BASE_URL}/users/upload`,  
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Failed to upload image");

    const data = await response.json();
    return data.img;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = user.img; 

      if (file) {
        try {
          imageUrl = await uploadFile(file);  
        } catch (error) {
          console.error("Image upload failed:", error);
          return;
        }
      }

      const updatedData = { ...formData, img: imageUrl };

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/update/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
          body: JSON.stringify(updatedData),
        }
      );
      
      const result = await response.json();
      if (result.statusCode === 200) {
        Swal.fire({
          title: 'Successo!',
          text: 'L\'utente è stato aggiornato con successo.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate(`/users/${userId}`);
      } else {
        Swal.fire({
          title: 'Errore!',
          text: result.message || 'Si è verificato un errore durante l\'aggiornamento.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Errore!',
        text: 'Si è verificato un errore durante la richiesta.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center justify-content-center">
        <Col sm = {12} md = {6}>
      <h2>Update User</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formImage">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit">
          Update User
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
  );
};

export default UpdateUserPage;
