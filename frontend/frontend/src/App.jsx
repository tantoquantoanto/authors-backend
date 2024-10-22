import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewUsersInput from "./pages/NewUsersInput";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { ProtectedRoutes } from "../../../backend/middlewares/ProtectedRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element = {<Login/>}/>
          <Route element = {<ProtectedRoutes/>}>
          <Route path="/home" element={<HomePage/>} />
          <Route path="/create-new-users" element={<NewUsersInput/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
