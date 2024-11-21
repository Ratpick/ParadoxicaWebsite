// src/components/CharacterCard.js
import React from "react";

const CharacterCard = ({ name, description, traits }) => {
  return (
    <div className="character-card">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>
        <strong>Traits </p>
    </div>
  );
};

export default CharacterCard;
