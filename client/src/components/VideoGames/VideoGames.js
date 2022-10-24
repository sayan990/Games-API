import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import Card from "../Card/Card";
import Paginate from "../Paginado/Paginado";
import "./VideoGames.css"


function Videogames({ games }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardPerPage] = useState(15);

  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  var currentCards = games.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <div className="cartas">
        {currentCards &&
          currentCards.map((g) => (
            <Card
              key={g.id}
              name={g.name}
              genres={g.genres}
              image={g.image}
              rating={g.rating}
              id={g.id}
            />
          ))}
      </div>
      <Paginate className="paginado"
        cardPerPage={cardPerPage}
        totalCards={games.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
  };
};

export default connect(mapStateToProps, null)(Videogames);
