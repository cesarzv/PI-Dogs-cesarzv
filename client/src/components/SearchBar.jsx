import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogName } from '../actions';
import s from './SearchBar.module.css';
import img from '../img/lupa.png';

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogName(name));
    setCurrentPage(1);
  };

  return (
    <div className={s.nav}>
      <input
        className={s.search}
        onChange={(e) => handleChangeName(e)}
        type="text"
        placeholder="Search dog..."
      ></input>
      <button className={s.btn} onClick={(e) => handleSubmit(e)} type="submit">
        <img className={s.lupa} alt="" src={img}></img>
      </button>
    </div>
  );
}
