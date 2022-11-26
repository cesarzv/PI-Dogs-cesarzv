import React from 'react';
import s from './Paginated.module.css';

export default function Paginated({ dogsPerPage, allDogs, paginated }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={s.navCont}>
      <ul className={s.ulCont}>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <li
                onClick={() => paginated(number)}
                className={s.numberList}
                key={number}
              >
                <a className={s.number}>{number} </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
