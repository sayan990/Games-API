import React from "react";
import { connect } from "react-redux";
import Videogames from "../VideoGames/VideoGames";
import Filters from "../Filters/Filters";
import { getAllVideogames, getAllGenres, orderBy } from "../../actions/index";
import "./AllVideoGames.css"



function AllVideogames({ getAllGenres, orderBy, getAllVideogames }) {
  const [change, setChange] = React.useState(true);
  React.useEffect(() => {
    getAllGenres();
    getAllVideogames("");
  }, [getAllGenres, getAllVideogames]);
  React.useEffect(() => {
    return () => {
      setChange(true);
    };
  }, [change]);
  const order = (order) => {
    orderBy(order);
    setChange(false);
  };
  const SearchVideogames = (params) => {
    getAllVideogames(params);
    setChange(false);
  };

  return (
    <div className="fondo">
      <Filters SearchVideogames={SearchVideogames} order={order} />
      <div className="AllVideoGames">{change && <Videogames />}</div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    getAllGenres: () => dispatch(getAllGenres()),
    orderBy: (order) => dispatch(orderBy(order)),
    getAllVideogames: (q) => dispatch(getAllVideogames(q)),
  };
};

export default connect(null, mapDispatchToProps)(AllVideogames);
