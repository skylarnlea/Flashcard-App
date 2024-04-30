import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {createDeck} from "../utils/api/index";

function CreateDeck() {
  const navigate = useNavigate();
  const initialFormState = { name: "", description: "" };
  const [newDeck, setNewDeck] = useState({...initialFormState})
  
  const handleName = ({target}) => {
    setNewDeck({
      ...newDeck,
      name: target.value,
    });
  }
  
  const handleDescription = ({target}) => {
    setNewDeck({
      ...newDeck,
      description: target.value,
    });
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await createDeck(newDeck);
    navigate(`/decks/${response.id}`)
  }
  
  return (
    <div>
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/"><span className="oi oi-home"/> Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Create Deck
        </li>
      </ol>
    </nav>
    
    <h2>Create Deck</h2>
    
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          placeholder="Deck Name"
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
          placeholder="Brief description of the deck"
          onChange={handleDescription}
          style={{width: "100%"}}
          rows="5"
        />
      </div>
      
      <br />
      
      <button
        type="button"
        className="btn btn-dark mr-2"
        onClick={() => navigate('/')}
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

export default CreateDeck;