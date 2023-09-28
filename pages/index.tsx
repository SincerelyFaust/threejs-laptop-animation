import React from "react";
import type { NextPage } from "next";
import Intro from "../components/Intro";

const Index: NextPage = () => {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Intro />
      </div>
    </>
  );
};

export default Index;
