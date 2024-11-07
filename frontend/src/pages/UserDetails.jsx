import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import useSession from "../../hooks/useSession";

const UserDetails = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("Authorization"); // Recupera il token

  const getUserFromApi = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/users/${userId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Usa il token qui
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserFromApi();
    }
  }, [token, userId]); // Aggiungi token alle dipendenze

  const goToUpdateUserPage = () => {
    navigate(`/users/update/${userId}`);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm = {12} md = {6} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={user.img}
              style={{ objectFit: "cover", height: "300px" }}
            />
            <Card.Body>
              <Card.Title>
                {user.name} {user.surname}
              </Card.Title>
              <Card.Text>Email: {user.email}</Card.Text>
              <Card.Text>Username: {user.username}</Card.Text>
              <Card.Text>Role: {user.role}</Card.Text>
              <Button variant="primary" className="mt-3" onClick={goToUpdateUserPage}>
                Edit User
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
