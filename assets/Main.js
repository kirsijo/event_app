import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EventShow from "./components/EventShow";
import EventList from "./components/EventList";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";


const Main = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/event/:id" element={<EventShow />} />
        {/* <Route path="/createEvent" element={<CreateEvent />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
      <Footer />
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

export default Main;
