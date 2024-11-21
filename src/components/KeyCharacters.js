// src/components/KeyCharacters.js
import React from "react";
import CharacterCard from "./CharacterCard";

const KeyCharacters = () => {
  const characters = [
    {
      name: "Necker",
      description:
        "A cunning pirate captain seeking mystical artifacts. His journey begins with the discovery of a music box in Libertalia and leads to the theft of the Harmony Forge Device.",
      traits: "Cunning, Idealistic, Charismatic",
    },
    {
      name: "Mariem",
      description:
        "A wise Berber mystic who guards the Scroll of the Enigmatic Blade. Her role is crucial in the Nasrid Period's resistance.",
      traits: "Wise, Resilient, Mysterious",
    },
    {
      name: "Alahudin",
      description:
        "A legendary Celt whose destiny intertwines with cosmic forces. His journey bridges Celtic and Berber mythologies.",
      traits: "Heroic, Charismatic, Tactician",
    },
  ];

  return (
    <section id="characters" className="section">
      <h2>Key Characters</h2>
      {characters.map((char, index) => (
        <CharacterCard
          key={index}
          name={char.name}
          description={char.description}
          traits={char.traits}
        />
      ))}
    </section>
  );
};

export default KeyCharacters;


