import React from 'react';
import { Link } from 'react-router-dom';
import Video from '../img/dogvideo.mp4';
import s from './Landing.module.css';

export default function Landing() {
  return (
    <div className={s.landingImg}>
      <video autoPlay muted loop id="myVideo">
        <source src={Video} type="video/mp4"></source>
      </video>
      <Link to="/home">
        <div className={s.landingBtn}>Explore dogs!</div>
      </Link>
    </div>
  );
}
