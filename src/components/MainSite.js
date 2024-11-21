// src/components/MainSite.js
import React from "react";
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import CreationMyth from "./CreationMyth";
import TOEOT from "./TOEOT";
import KeyCharacters from "./KeyCharacters";
import GameplayEvolution from "./GameplayEvolution";

const MainSite = () => {
  return (
    <div>
      <NavBar />
      <div className="main-content">
        <HeroSection />
        <CreationMyth />
        <TOEOT />
        <KeyCharacters />
        <GameplayEvolution />
      </div>
    </div>
  );
};

export default MainSite;
