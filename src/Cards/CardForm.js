import React from "react";

function CardForm({ handleFront, handleBack, card={} }) {
    
    function cardFront() {
        return card.front ? card.front : "";
    }

    function cardBack() {
        return card.back ? card.back : "";
    }
  
  
  return (
    <div>
      <div className="form-group">
        <label>Front</label>
        <textarea
          id="cardFront"
          name="cardFront"
          className="form-control"
          placeholder="Front side of card"
          row="3"
          onChange={handleFront}
          value={cardFront()}
        />        
      </div>
      <div className="form-group">
        <label>Back</label>
        <textarea
          id="cardBack"
          name="cardBack"
          className="form-control"
          placeholder="Back side of card"
          row="3"
          onChange={handleBack}
          value={cardBack()}
        /> 
      </div>
    </div>
  )
}

export default CardForm;
