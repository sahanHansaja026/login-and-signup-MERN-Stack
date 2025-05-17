import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import HomePage from "./pages/home_page";

function App() {
  return (
    <BrowserRouter>
      <div className="containe">
        <Routes>
          {" "}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
