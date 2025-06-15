import React, { useState } from "react";
import Header from './components/Header'
import MainSection from './components/MainSection'

const Rank = () => {
  return (
    <div className="bg-white flex flex-col h-screen w-full box-border overflow-y-auto no-scrollbar">
      <Header />
      <MainSection />
    </div>
  );
};

export default Rank;
