import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import StudyCard from "../Cards/StudyCard";

function StudyDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState("");
  
  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    }
    getDeck();
    return () => {
      abortController.abort();
    }
  }, [deckId]);
  
  
    return (
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/"><span className="oi oi-home"/>Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Study
                </li>
              </ol>
            </nav>
        
            <h2 className="mb-4">Study: {deck.name}</h2>
        
            <StudyCard deck={deck} />
          </div>
    )
}

export default StudyDeck;