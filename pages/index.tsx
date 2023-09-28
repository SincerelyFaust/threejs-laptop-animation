import React from "react";
import type { NextPage } from "next";
import Hero from "../components/Hero";

const Index: NextPage = () => {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Hero />
      </div>
    </>
  );
};

export default Index;
