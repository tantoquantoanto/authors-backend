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

 const loginRequest = async () => {
  try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/login`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem('Authorization', data.token);
          navigate('/destinations', {replace: true})
      }
      return response
  } catch (e) {
      console.log(e.message)
  }
}


const goToGitHubLogin = () => {
window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/github`
}



 const onSubmit = async (e) => {
    e.preventDefault()
   await loginRequest()
    };
 

    return (
        <>
       <Container>
        <Row className="d-flex align-items-center justify-content-center">
            <Col sm ={12} md = {4}>
<Form onSubmit={onSubmit} className="gap-2">
    <Form.Control type="email" name="email" placeholder="Enter email" onChange={onChangeInput}/>
    <Form.Control type="password" name="password" placeholder="Enter password" onChange={onChangeInput} />
    <div className="d-flex flex-column align-items-center justify-content-center gap-2 mt-2">
    <Button  variant="primary" type="submit">Accedi</Button>
    <Button  variant="primary" type="submit" onClick={goToGitHubLogin}>Login con GitHub</Button>
    </div>
</Form>
</Col>
</Row>
</Container>

</>
 )


}

export default Login