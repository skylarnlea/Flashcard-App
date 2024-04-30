import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listDecks } from "../utils/api/index";
import ListOfDecks from "../Decks/ListOfDecks";

function Home() {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function getDeck() {
      const response = await listDecks();
      setDecks(response);
    }
    getDeck();
  }, []);
  
  return (
    <div>
      <div className="row mx-auto">
        <button
          type="button"
          className="btn btn-success mb-3 btn-lg"
          onClick={() => navigate('/decks/new')}
        >
          <span className="oi oi-plus" /> Create Deck
        </button>
      </div>
      <div className="row w-100 mx-auto">
        {decks.map((deck) => (
          <ListOfDecks key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  )
}

export default Home;