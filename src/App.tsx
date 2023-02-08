import React from "react";
import Home from "./views/Home";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/mechanic" element={<Home />} />
                <Route path="/" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />{" "}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
