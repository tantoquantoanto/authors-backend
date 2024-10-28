import { useState } from "react";
import { Form } from "react-bootstrap";

const DestinationsSearchInput = () => {
 


  return (
    <Form className="d-flex ms-2">
      <Form.Control
        type="search"
        name= "destination"
        placeholder="Search..."
        className="me-2"
        aria-label="Search"
      />
    </Form>
  );
};

export default DestinationsSearchInput

