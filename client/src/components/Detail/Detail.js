import React from "react";
import { connect } from "react-redux";
import { getVideogameDetail } from "../../actions/index";
import { useParams } from "react-router-dom";
import "./Detail.css"
import Filters from "../Filters/Filters";
function Detail({ gameDetail, getVideogameDetail }) {
  const {id} = useParams()
  React.useEffect(() => {
    getVideogameDetail(id);
  }, [id, getVideogameDetail]);
  return (
    <div>

      <Filters SearchVideogames={null} order={null}></Filters>
      {gameDetail && (
        <div className="container-detail">
          
          <div className="detail-container">
          <h1 className="tit-card">{gameDetail && gameDetail.name}</h1>
            <img
              className="img-style"
              src={`${gameDetail.image}`}
              alt="imagen no encontrada (404) :("
            />

            <div>
              <div>
                <p className="tit-detail">Generos:</p>
                <p style={{ margin: 0, marginBottom: "10px" }}>
                  {gameDetail.genres &&
                    gameDetail.genres.map((g) => (
                      <p style={{ margin: 0 }}>{g.name}</p>
                    ))}
                </p>
              </div>
              <div className="descripcion">
                <span className="tit-detail">Descripción</span>
                <p>{gameDetail && gameDetail.description}</p>
                <p>
                  El juego fue lanzado en: <span>{gameDetail.released}</span>
                </p>
                <p>
                  <span>Rating: </span>
                  {gameDetail && Math.round(gameDetail.rating) >= 1 && "x"}
                  {gameDetail && Math.round(gameDetail.rating) >= 2 && "x"}
                  {gameDetail && Math.round(gameDetail.rating) >= 3 && "x"}
                  {gameDetail && Math.round(gameDetail.rating) >= 4 && "x"}
                  {gameDetail && Math.round(gameDetail.rating) === 5 && "x"}(
                  {" " + gameDetail.rating + " "})
                </p>
                <span className="tit-detail">Plataformas:</span>{" "}
                <div>
                  {gameDetail.platforms &&
                    gameDetail.platforms.map((p) => (
                      <span>{p.platform.name + ", "}</span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    gameDetail: state.gameDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVideogameDetail: (id) => dispatch(getVideogameDetail(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
