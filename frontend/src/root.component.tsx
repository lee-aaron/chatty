import React from "react";

import "./css/main.css";
import Room from "./components/room";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Root(props) {
  return (
    <section className="main">
      <Room />
      <ToastContainer />
    </section>
  );
}
