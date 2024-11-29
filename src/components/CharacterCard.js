import React from "react";
import { Link } from "react-router-dom";
import "./CharacterCard.css";

const CharacterCard = ({ character }) => {
  const speciesColor = {
    Human: "lightblue",
    Droid: "gray",
  };

  const cardStyle = {
    backgroundColor: speciesColor[character.species] || "#e0e1dd",
  };

  return (
    <Link to={`/character/${character.url.split("/")[5]}`} className="character-card" style={cardStyle}>
      <div className="img-container">
      <img src={`https://picsum.photos/200/300?random=${Math.random()}`} alt={character.name} />
      {/* Hello World */}
      </div>
      <h3>{character.name}</h3>
    </Link>
  );
};

export default CharacterCard;
