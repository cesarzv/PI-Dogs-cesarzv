import React from 'react';
import s from './NavBar.module.css';
import Image from '../img/logoNav2.png';
import Image2 from '../img/create2.png';
import { Link } from 'react-router-dom';

import {
  filterDogsByTemperament,
  filterCreated,
  sortByName,
  sortByWeight,
} from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTemperaments } from '../actions';
import SearchBar from './SearchBar';

export default function NavBar({ setCurrentPage, setOrder }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const temperaments = useSelector((state) => state.temperaments);

  const handleFilterTemp = (e) => {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
    setCurrentPage(1);
  };

  const handleFilterCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    if (e.target.value === 'asc' || e.target.value === 'desc')
      dispatch(sortByName(e.target.value));
    if (e.target.value === 'wAsc' || e.target.value === 'wDesc')
      dispatch(sortByWeight(e.target.value));

    e.preventDefault();
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  };

  return (
    <div className={s.navCont}>
      <Link to="/creator">
        <img className={s.logo} src={Image} alt="logoNav"></img>
      </Link>
      <img className={s.create} alt="" src={Image2}></img>
      <div className={s.selects}>
        <select onChange={(e) => handleFilterTemp(e)} className={s.select}>
          <option>Temperament:</option>
          <option value="All">All</option>
          {temperaments &&
            temperaments.map((t) => {
              return (
                <option value={t.name} key={t.id}>
                  {t.name}
                </option>
              );
            })}
        </select>
        <select onChange={(e) => handleFilterCreated(e)} className={s.select}>
          <option>Creation:</option>
          <option value="All">All dogs</option>
          <option value="Created">Created</option>
          <option value="Api">API</option>
        </select>
        <select onChange={(e) => handleSort(e)} className={s.select}>
          <option>Sort by:</option>
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
          <option value="wAsc">Weight (asc)</option>
          <option value="wDesc">Weight (desc)</option>
        </select>
      </div>
      <SearchBar setCurrentPage={setCurrentPage} />
    </div>
  );
}
