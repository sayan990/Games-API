import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export default function Videogame(data) {
  return (
    <Fragment>
      <div className="card-container">
        <div className="card-container__info">
          
        <div className="card__header">
        {data.image ? (
          <img src={`${data.image}`} alt="Videogames" className="img-style"/>
        ) : (
          <img src={"not_found"} alt="not found" ></img>
        )}
        </div>
        <div className="card__body">
          <h2 className="tit-card">{data.name}</h2>
          {data.genres &&
            data.genres.map((g, i) => {
              if (i < 3) {
                return <span className="card-genres__style" > {g.name} </span>;
              }
              return null; //no hay otra vuelta, para q no regrese nada
            })}
            <p className="card-rating">Rating: {data.rating}</p>
            <div className="button-container">
          {data.id && (
            <Link to={`/home/GameDetail/${data.id}`}>
              
                <button className="boton-det">Detalles</button>
              
            </Link>
          )}
        </div>
            </div>
          
        </div>
        
        
      </div>
    </Fragment>
  );
}
