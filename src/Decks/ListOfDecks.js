import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";


function ListOfDecks({ deck }) {
    const { id, name, description, cards } = deck;
    const deckLength = cards.length;
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const deleteOnClick = window.confirm(
            "Are you sure you want to delete this deck? You will not be able to recover it."
        )
        if (deleteOnClick) {
            await deleteDeck(id);
            navigate(0);
        } else {
            navigate(0);
        }
    };

    return (
        <div className="card w-75 mb-4">
            <div className="card-body">
                <div className="row px-3">
                    <h4 className="card-title">{name}</h4>
                    <p className="ml-auto">{deckLength} cards</p>
                </div>
                <p className="card-text">{description}</p>
                <div className="row px-3">
                    <button
                        type="button"
                        className="btn btn-dark mr-2"
                        onClick={() => navigate(`/decks/${deck.id}`)}
                    >
                        <span className="oi oi-eye" /> View
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary mr-2"
                        onClick={() => navigate(`/decks/${deck.id}/study`)}
                     >
                        <span className="oi oi-book" /> Study
                    </button>
                    <button
                        onClick={handleDelete}
                        name="delete"
                        value={id}
                        className="btn btn-danger">
                            Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ListOfDecks;