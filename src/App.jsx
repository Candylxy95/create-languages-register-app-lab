import React from "react";
import Display from "./components/Display";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <br />
      <NavBar />
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/user-list" element={<Profile />} />
        <Route path="*" element={<h1>You've strayed. Head back</h1>} />
      </Routes>
    </div>
  );
}

export default App;
