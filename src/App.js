import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage.jsx"
import "./styles/sidebar.css";
import Login from "./components/Login.jsx"


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/homepage" exact element={<Homepage />} />
      </Routes>
    </Router>
  )
}
