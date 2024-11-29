// CharacterList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "./CharacterCard";
import './CharacterList.css'; 
import './Pagination.css';
import Loader from "./Loader";


const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
        setCharacters(response.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [page]);

  if (error) return <div>{error}</div>;

  return (
    <div className='container'>
      <div className="character-list">
        {loading? (<Loader/>): characters.results.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </div>
      <div className="pagination">
        {characters.previous && <button onClick={() => setPage(page - 1)}>Previous</button>}
        {characters.next && <button onClick={() => setPage(page + 1)}>Next</button>}
      </div>
    </div>
  );
};

export default CharacterList;
