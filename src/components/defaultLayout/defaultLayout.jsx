import React from "react";
import Footer from "../Footer";
import Section from "../Section";
import Slider from "../Slider";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <Outlet />
      <Slider />
      <Section />
      <Footer />
    </>
  );
};

export default DefaultLayout;
