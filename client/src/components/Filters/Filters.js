import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./Filters.css"

function Filters({ SearchVideogames, order, genres }) {
  const handleSelect = (e) => {
    order(e.target.value);
  };
  return (
    <div className="containerFilter">
      <button className="boton-home">
        <Link to="/home">Inicio</Link>
      </button>
      <button className="boton-add">
        <Link to="/home/addGame">Agregar juego</Link>
      </button>
      <select onChange={handleSelect} className="select-filter" name="" id="">
        <option value="defaultValue" selected>
          Default
        </option>
        <optgroup label="Alphabetic">
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
        </optgroup>
        <optgroup label="Rating">
          <option value="asc">Higher to lower</option>
          <option value="desc">Lower to higher</option>
        </optgroup>
        <optgroup label="Genres">
          {genres &&
            genres.map((g) => <option value={g.name}>{g.name}</option>)}
        </optgroup>
      </select>
      <SearchBar SearchVideogames={SearchVideogames} />
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    genres: state.genres,
  };
};

export default connect(mapStateToProps, null)(Filters);
