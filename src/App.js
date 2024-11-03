import React from "react";
import Login from "./components/auth/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
