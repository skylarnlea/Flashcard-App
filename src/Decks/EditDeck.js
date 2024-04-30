import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
  const navigate = useNavigate;
  const [deck, setDeck] = useState({ name: "", description: "", id: "", cards: [] });
  const { deckId } = useParams();
  
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
  
  const handleName = ({target}) => {
    setDeck({
      ...deck,
      name: target.value,
    });
  }
  
  const handleDescription = ({target}) => {
    setDeck({
      ...deck,
      description: target.value,
    });
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await updateDeck(deck);
    navigate(`/decks/${response.id}`)
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
          Edit Deck
        </li>
      </ol>
    </nav>
      
    <h2>Edit Deck</h2>
      
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          value={deck.name}
          onChange={handleName}
          style={{width: "100%"}}
        />
      </div> 
      <div className="form-group">
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          type="textarea"
          className="form-control"
          value={deck.description}
          onChange={handleDescription}
          style={{width: "100%"}}
          rows="5"
        />
      </div>
      
      <br />
      
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
        onClick={handleSubmit}
      >
        Submit
      </button>
     </form>
    </div>
  )
}

export default EditDeck;