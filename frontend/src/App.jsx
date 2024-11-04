import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NewUsersForm from "./pages/NewUsersForm";
import UserDetails from "./pages/UserDetails";
import UpdateUserPage from "./pages/UpdateUserPage";
import NewDestinationsForm from "./components/Destinations/NewDestinationsForm";
import DestinationDetails from "./components/Destinations/DestinationDetails";
import { DestinationsProvider } from "../contexts/DestinationsContext";
import Contatti from "./pages/Contatti";
import DestinationsPage from "./DestinationsPage";
import AdminDestinationsComponent from "./components/Destinations/AdminDestinationsComponent";
import { ProtectedRoutes } from "../middleWares/ProtectedRoutes";

function App() {
  return (
    <>
      <DestinationsProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route
              path="/destinations/:destinationId"
              element={<DestinationDetails />}
            />
            <Route path="/contatti" element={<Contatti />} />
            <Route
              path="/create-new-destination"
              element={<NewDestinationsForm />}
            />
            <Route
              path="/admin-destinations"
              element={<AdminDestinationsComponent />}
            />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/create-new-users" element={<NewUsersForm />} />
              <Route path="/users/:userId" element={<UserDetails />} />
              <Route
                path="/users/update/:userId"
                element={<UpdateUserPage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </DestinationsProvider>
    </>
  );
}

export default App;
