import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashbord/Dashboard";
import FavouritePage from "./components/pages/FavouritePage";
import ProtectedRoute from "../src/context/auth";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favourite"
        element={
          <ProtectedRoute>
            <FavouritePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
