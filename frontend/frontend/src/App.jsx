import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";

function App() {
  const [formState, setFormState] = useState({});

  const onChangeInput = (e) => {
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
        `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  return <>
  <Container>
    <Row>
      <Col>
  <form className="d-flex align-items-center justify-content-center" onSubmit={onsubmit}>
    <input type="text" name="email" onChange={onChangeInput}/>
    <input type="text" name="password" onChange={onChangeInput}/>
    <button type="submit">Invia</button>
  </form>
  </Col>
  </Row>
  </Container>
  </>;
}

export default App;
