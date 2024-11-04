import React from "react";
import Login from "./components/auth/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashbord/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;
