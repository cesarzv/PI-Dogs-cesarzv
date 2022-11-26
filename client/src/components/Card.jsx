import React from 'react';
import s from './Card.module.css';
import { NavLink } from 'react-router-dom';

export default function Card({
  name,
  height,
  weight,
  life_span,
  image,
  temperament,
  id,
}) {
  return (
    <NavLink to={`/details/${id}`} style={{ textDecoration: 'none' }}>
      <div className={s.cardCont}>
        <div className={s.imgCont}>
          <img
            className={s.img}
            src={image}
            alt=""
            width="350px"
            height="250px"
          ></img>
        </div>
        <div className={s.text}>
          <h2>{name}</h2>
          <div className={s.details}>
            <p>
              {height} cm <br />
              {weight} kg <br />
              {life_span}
            </p>
          </div>
          <h4>{temperament}</h4>
        </div>
      </div>
    </NavLink>
  );
}
