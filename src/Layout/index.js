import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import StudyDeck from "../Decks/StudyDeck";
import CreateDeck from "../Decks/CreateDeck";
import ViewDeck from "../Decks/ViewDeck";
import EditDeck from "../Decks/EditDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";
import NotFound from "./NotFound";


function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
          <Routes>
            <Route path="/" element={<Home />}></Route>
            
            <Route path="/decks/:deckId/study" element={<StudyDeck />}></Route>
            
            <Route path="/decks/new" element={<CreateDeck />}></Route>
            
            <Route path="/decks/:deckId" element={<ViewDeck />}></Route>

            <Route path="/decks/:deckId/edit" element={<EditDeck />}></Route>
            
            <Route path="/decks/:deckId/cards/new" element={<AddCard />}></Route>
            
            <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />}></Route>

            <Route path="*" element={<NotFound />}></Route>
          </Routes>
      </div>
    </>
  );
}

export default Layout;
