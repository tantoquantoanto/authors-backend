import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { ProtectedRoutes } from "../../backend/middlewares/ProtectedRoutes";
import NewUsersForm from "./pages/NewUsersForm";
import UserDetails from "./pages/UserDetails";
import UpdateUserPage from "./pages/UpdateUserPage";
import NewDestinationsForm from "./components/Destinations/NewDestinationsForm";

import DestinationsComponent from "./components/Destinations/DestinationsComponent";
import DestinationDetails from "./components/Destinations/DestinationDetails";
import { DestinationsProvider } from "../contexts/DestinationsContext";

function App() {
  return (
    <>
    <DestinationsProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element = {<Login/>}/>
          <Route path="/destinations" element = {<DestinationsComponent/>}/>
          <Route path="/destinations/:destinationId" element = {<DestinationDetails/>}/>
          <Route path = "/create-new-destination" element = {<NewDestinationsForm/>}/>
          <Route element = {<ProtectedRoutes/>}>
          <Route path="/home" element={<HomePage/>} />
          <Route path="/create-new-users" element={<NewUsersForm/>}/>
          <Route path="/users/:userId" element = {<UserDetails/>}/>
          <Route path="/users/update/:userId" element = {<UpdateUserPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </DestinationsProvider>
     
    </>
  );
}

export default App;
