import React from 'react';
import NavBar from './NavBar';
import Cards from './Cards';
import s from './Home.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Paginated from './Paginated';

export default function Home() {
  // const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [order, setOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={s.homeCont}>
      <NavBar setCurrentPage={setCurrentPage} setOrder={setOrder} />
      <Paginated
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginated={paginated}
      />
      <Cards currentDogs={currentDogs} />
    </div>
  );
}
