import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {

  return (
    <section id="landing">
      <header>
        <div className="header__container">
          <div className="header__description">
            
            <h2>
              Find your movie with <span className="blue">React Movie App Library</span>
            </h2>
            <a href="#features">
              <Link to="/movies" className="btn">Browse Movies</Link>
            </a>
          </div>
          <figure className="header__img--wrapper">
            <img src="undraw_horror-movie_9020.svg" alt="" />
          </figure>
        </div>
      </header>
    </section>
  );
};

export default Landing;