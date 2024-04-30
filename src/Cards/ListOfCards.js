import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api/index";

function ListOfCards({cards}) {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const navigate = useNavigate();
    
    // get cards from deck with api call
    useEffect(() => {
        const abortController = new AbortController();
        async function getCards() {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response);
        }
        getCards();
        return () => {
            abortController.abort()
        }
    }, [deckId]);
console.log(deck)
    return (
        <div>
            {cards?.map((card, id) => (
                <div className="card" key={id}>
                    <div className="card-body">
                        <p>{card.front}</p>
                        <p>{card.back}</p>

                        <button
                            type="button"
                            className="btn btn-dark mr-2"
                            onClick={() => navigate(`/decks/${deckId}/cards/${card.id}/edit`)}
                        >
                            <span className="oi oi-pencil" /> Edit
                        </button>

                        <button onClick={async () => {
                            if (window.confirm(
                                "Delete this card? You will not be able to recover it."
                            )) {
                                await deleteCard(card.id);
                                navigate(0);
                            } else {
                                navigate(0);
                            }
                        }} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListOfCards;