import React from 'react';
import s from './Details.module.css';
import { Link, useParams } from 'react-router-dom';
import { getDetails, cleanDog } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Gif from '../img/dogGif.gif';

export default function Details() {
  const dispatch = useDispatch();
  const detailDog = useSelector((state) => state.details);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
    return function () {
      dispatch(cleanDog());
    };
  }, [id, dispatch]);

  return (
    <div>
      <div className={s.header}>
        <Link to="/home" style={{ textDecoration: 'none' }} className={s.back}>
          ⬅️ Back to Home
        </Link>
      </div>
      {detailDog.length > 0 ? (
        <div className={s.cont}>
          <div className={s.detailCont}>
            <div className={s.imgCont}>
              <img src={detailDog[0].image} alt=""></img>
            </div>
            <div className={s.dText}>
              <h2>{detailDog[0].name}</h2>
              <p>Height: {detailDog[0].height.metric} cm</p>
              <p>Weight: {detailDog[0].weight.metric} kg</p>
              <p>Life span: {detailDog[0].life_span}</p>
              <p>Temperaments: {detailDog[0].temperament}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <img src={Gif} alt="" width="800px"></img>
        </div>
      )}
    </div>
  );
}
