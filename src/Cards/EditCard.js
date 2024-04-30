import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard(){
  const navigate = useNavigate();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "", id: "", cards: [] })
  const [card, setCard] = useState({ front: "", back: "", deckId: "", id: "" })
  
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
  
  useEffect(() => {
    const abortController = new AbortController();
    async function getCard() {
      const response = await readCard(cardId, abortController.signal);
      setCard(response);
    }
    getCard();
    return () => {
      abortController.abort();
    }
  }, [cardId]);
  
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
          <Link to="/"><span className="oi oi-home" />Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>Deck: {deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Edit Card {card.id}
        </li>
      </ol>
      </nav>
      
      <h2>Edit Card</h2>
      
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
        Cancel
      </button>
      
      <button 
        type="submit" 
        className="btn btn-success"
        onClick={submitHandler}
      >
        Submit
      </button>
    </div>
  )
}

export default EditCard;