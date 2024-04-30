import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index";
import ListOfCards from "../Cards/ListOfCards";

function ViewDeck() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({cards: []});
  const { name, description, cards } = deck;
  
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
  
  const handleDeleteDeck = async (id) => {
    const deleteOnClick = window.confirm("Delete this deck? You will not be able to recover it.")
    if (deleteOnClick) {
      await deleteDeck(id);
      navigate(0);
    } else {
      navigate(0);
    }
  }
  
  
  return (
    <div>
     <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home"/>Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {name}
        </li>
      </ol>
     </nav>
    
     <div className="card">
       <div className="card-body">
         <div className="card-title">
           <h2>{name}</h2>
           <p className="card-text">{description}</p>
           <div className="d-flex mb-4">
            <div className="mr-auto">
              <button
                type="button"
                className="btn btn-dark mr-2"
                onClick={() => navigate(`/decks/${deckId}/edit`)}
              >
                <span className="oi oi-pencil" /> Edit
              </button>
              <button
                type="button"
                className="btn btn-primary mr-2"
                onClick={() => navigate(`/decks/${deckId}/study`)}
              >
                <span className="oi oi-book" /> Study
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => navigate(`/decks/${deckId}/cards/new`)}
              >
                <span className="oi oi-plus" /> Add Cards
              </button>
             </div>
             <div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteDeck}
              >
                <span className="oi oi-trash" />
              </button>
             </div>
            </div>
         </div>
         
         <div>
           <h3>Cards</h3>
           <ListOfCards cards={cards} />
         </div>
     
      </div>
    </div>
   </div>
  )
}

export default ViewDeck;