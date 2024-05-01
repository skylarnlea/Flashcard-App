import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function StudyCard({ deck }) {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [count, setCount] = useState(0);
  const { cards } = deck || {};
  const [cardFront, setCardFront] = useState(true);
  const cardList = cards || [];
  
  useEffect(() => {
    const abortController = new AbortController();
    // setCurrentCard(cardList[count]);
    
    return () => {
      abortController.abort();
    }
  }, [cardList, count]);
  
  const handleFlip = () => {
    if (cardFront) {
      setCardFront(false);
    } else {
      setCardFront(true)
    }
  };
  
  const nextButton = () => {
    if (cardList.length === count + 1) {
      window.confirm("Restart cards? Click 'cancel' to return to the home page.") ? setCount(0) : navigate('/');
    } else {
      setCount((count) => count + 1);
      setCardFront(true);
    }
  };
  
  if (cardList.length > 2) {
    return (
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h5>Card {count + 1} of {cardList.length}</h5>
                  <div className="card-text">
                    <p>{cardFront ? cardList[count].front : cardList[count].back}</p>
                    
                    <button 
                      type="button" 
                      className="btn btn-dark mr-2" 
                      onClick={handleFlip}
                    >
                      Flip
                    </button>
                    
                    {!cardFront ? 
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={nextButton}
                      >
                        Next
                      </button>
                     : null}
                  </div>
                </div>
              </div>
            </div>
    )
  } else {
    return (
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <h3>{deck.name}: Study</h3>
                <h4 className="text-danger font-weight-bold">Not enough cards.</h4>
                
                <div className="card-text">
                  <p>You need at least 3 cards to study. There are {cardList.length} cards in this deck.</p>
                </div>
                
                <Link
                  className="btn btn-primary"
                  to={`/decks/${deckId}/cards/new`}
                >
                  <span className="oi oi-plus" /> Add Cards
                </Link>
              </div>
          </div>
        </div>
    );
  }
}

export default StudyCard;