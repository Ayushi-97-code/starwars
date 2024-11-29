import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import './CharacterDetails.css'

const CharacterDetails = () => {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [character, setCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const characterRes = await axios.get(`https://swapi.dev/api/people/${id}/`);
        setCharacter(characterRes.data);
        const homeworldRes = await axios.get(characterRes.data.homeworld);
        setHomeworld(homeworldRes.data);
      } catch (err) {
        setError("Failed to load character details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);


  if (error) return <div>{error}</div>;

  return (
    <div className="character-container">
      {loading? (<Loader/>): (
        <div className="character-details">
        <h1>{character.name}</h1>
        <p><span className="span-container">Height:</span> {character.height / 100} m</p>
        <p><span className="span-container">Mass:</span> {character.mass} kg</p>
        <p><span className="span-container">Birth Year:</span> {character.birth_year}</p>
        <p><span className="span-container">Date person was added:</span> {new Date(character.created).toLocaleDateString("en-GB")}</p>
        <p><span className="span-container">No. of films:</span> {character.films.length}</p>
        {homeworld && (
          <div>
            <h2>Homeworld</h2>
            <p><span className="span-container">Name:</span> {homeworld.name}</p>
            <p><span className="span-container">Terrain:</span> {homeworld.terrain}</p>
            <p><span className="span-container">Climate:</span> {homeworld.climate}</p>
            <p><span className="span-container">No. of residents:</span> {homeworld.residents.length}</p>
          </div>
        )}
        </div>
      )}
      
    </div>
  );
};

export default CharacterDetails;
