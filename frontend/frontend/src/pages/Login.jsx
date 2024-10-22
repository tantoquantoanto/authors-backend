import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
 const [formData, setFormData] = useState({});
 const onChangeInput = (e) => {
 const {name, value} = e.target;
 setFormData({
    ...formData,
    [name]: value
 })   
 }

 const onSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
          }
        );
        
        const data = await response.json();
        if(response.ok) {
            localStorage.setItem("Auth", "true");
            navigate("/home")
           
        }

        return data;
       
      } catch (error) {
        console.log(error);
      }
    };
 

    return (
        <>
       <Container>
        <Row>
            <Col>
<Form onSubmit={onSubmit}>
    <Form.Control type="email" name="email" placeholder="Enter email" onChange={onChangeInput}/>
    <Form.Control type="password" name="password" placeholder="Enter password" onChange={onChangeInput} />
    <Button  variant="primary" type="submit">Accedi</Button>
</Form>
</Col>
</Row>
</Container>

</>
 )


}

export default Login