import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {readDeck, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
  const navigate = useNavigate();
  const [deck, setDeck] = useState({ name: "", description: "", id: "", cards: [] });
  const initialFormState = { front: "", back: "",}
  const [card, setCard] = useState({...initialFormState});
  const { deckId } = useParams();
  
  useEffect(() => {
    const abortController = new AbortController();
    async function getDeck() {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response)
    }
    getDeck();
    return () => {
      abortController.abort();
    }
  }, [deckId]);
  
  async function submitHandler(event) {
      event.preventDefault();
      await updateCard(card);
      navigate(`/decks/${deck.id}`);
  }
  
  const handleFront = ({ target }) => {
    setCard({
      ...card,
      front: target.value,
    })
  }
  
  const handleBack = ({ target }) => {
    setCard({
      ...card,
      back: target.value,
    })
  }
  
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
          Add Card
        </li>
      </ol>
    </nav>
      
    <h2>{deck.name}: Add Card</h2>
      
    <CardForm 
      handleFront={handleFront}
      handleBack={handleBack}
      card={card}
    />
      
    <button
      type="button"
      className="btn btn-dark mr-2"
      onClick={() => navigate(`/decks/${deckId}`)}
    >
      Done
    </button>
    <button 
      type="submit" 
      className="btn btn-success"
      onClick={submitHandler}
    >
      Save
    </button>
   </div>
  )
}

export default AddCard;