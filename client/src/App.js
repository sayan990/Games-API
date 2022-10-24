import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from "./components/LandingPage/LandingPage";
import Detail from "./components/Detail/Detail";
import AllVideoGames from "./components/AllVideoGames/AllVideoGames.js";
import AddGame from "./components/AddGame/AddGame";
import {Provider} from 'react-redux';
import store from "./store/index";
import "./App.css"

import "./App.css";

function App() {
  
  return (
    <BrowserRouter>
      <Provider store={store}>
      
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/home' element={<AllVideoGames/>} />
          <Route exact path='/home/addGame' element={<AddGame/>} />
          <Route path="/home/GameDetail/:id" element={<Detail/>}/>
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App;
