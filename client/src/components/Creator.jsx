import React from 'react';
import { postDog, getTemperaments } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './Creator.module.css';
import img from '../img/close3.png';
import gif1 from '../img/dogif1.gif';
import gif2 from '../img/dogif2.gif';

const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = 'Se requiere un nombre';
  }
  // if (
  //   input.name[0] !== input.name[0].toUpperCase() ||
  //   !/^[a-zA-Z]+$/.test(input.name)
  // ) {
  //   errors.name = 'La primera letra debe ser mayuscula';
  // }
  if (!/^[0-9]*$/.test(input.height)) {
    errors.height = 'Height debe tener numeros';
  }
  if (!/^[0-9]*$/.test(input.weight)) {
    errors.weight = 'Weight debe tener numeros';
  }
  if (!input.height) {
    errors.height = 'Se requiere un height';
  }
  if (!input.weight) {
    errors.weight = 'Se requiere un weight';
  }
  if (!input.life_span) {
    errors.life_span = 'Se requiere un life span';
  }
  if (!input.image) {
    errors.image = 'Se requiere una imagen';
  }

  return errors;
};

export default function Creator() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({
    name: '',
    height: '',
    weight: '',
    life_span: '',
    image: '',
    temperament: [],
  });
  const [input, setInput] = useState({
    name: '',
    height: '',
    weight: '',
    life_span: '',
    image: '',
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: [e.target.value],
      })
    );
  };

  const handleSelect = (e) => {
    if (!input.temperament.includes(e.target.value)) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postDog(input));
    alert('The dog was created successfully :)');
    setInput({
      name: '',
      height: '',
      weight: '',
      life_span: '',
      image: '',
      temperament: [],
    });
  };

  const handleDelete = (t) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((e) => e !== t),
    });
  };

  return (
    <div>
      <div className={s.header}>
        <Link to="/home" style={{ textDecoration: 'none' }} className={s.back}>
          ⬅️ Back to Home
        </Link>
      </div>
      <div className={s.cont}>
        <h1>Create your dog:</h1>
        <div className={s.formCont}>
          <form>
            <div className={s.wasd}>
              <label>Name:</label>
              <input
                className={s.inputText}
                onChange={(e) => handleChange(e)}
                placeholder="Dog name"
                type="text"
                value={input.name}
                name="name"
              />
              {errors.name && <p className={s.error}>{errors.name}</p>}
            </div>
            <div>
              <label>Height:</label>
              <input
                className={s.inputText}
                onChange={(e) => handleChange(e)}
                type="text"
                value={input.height}
                name="height"
              />
              {errors.height && <p className={s.error}>{errors.height}</p>}
            </div>
            <div>
              <label>Weight:</label>
              <input
                className={s.inputText}
                onChange={(e) => handleChange(e)}
                type="text"
                value={input.weight}
                name="weight"
              />
              {errors.weight && <p className={s.error}>{errors.weight}</p>}
            </div>
            <div>
              <label>Life_span:</label>
              <input
                className={s.inputText}
                onChange={(e) => handleChange(e)}
                type="text"
                value={input.life_span}
                name="life_span"
              />
              {errors.life_span && (
                <p className={s.error}>{errors.life_span}</p>
              )}
            </div>
            <div>
              <label>Image:</label>
              <input
                className={s.inputText}
                onChange={(e) => handleChange(e)}
                placeholder="Insert URL"
                type="text"
                value={input.image}
                name="image"
              />
              {errors.image && <p className={s.error}>{errors.image}</p>}
            </div>

            <div>
              <select className={s.select} onChange={(e) => handleSelect(e)}>
                <option>Temperament:</option>
                {temperaments &&
                  temperaments.map((t) => {
                    return (
                      <option value={t.name} key={t.id}>
                        {t.name}
                      </option>
                    );
                  })}
              </select>
              <ul className={s.ulCont}>
                {input.temperament.map((t) => (
                  <li
                    onClick={() => handleDelete(t)}
                    key={t.toString()}
                    className={s.list}
                  >
                    <span className={s.texto}>{t}</span>
                    <span className={s.icon}>
                      <img src={img} alt="" width="30px"></img>
                    </span>
                  </li>
                ))}
                {console.log(input)}
              </ul>
            </div>
          </form>
          <button
            onClick={(e) => handleSubmit(e)}
            className={s.sub}
            type="submit"
            disabled={
              errors.name || errors.height || errors.weight || errors.life_span
            }
          >
            Create
          </button>
        </div>
        <div className={s.gif1}>
          {/* {errors.name && <p className={s.error}>{errors.name}</p>}
          {errors.height && <p className={s.error}>{errors.height}</p>}
          {errors.weight && <p className={s.error}>{errors.weight}</p>}
          {errors.life_span && <p className={s.error}>{errors.life_span}</p>}
          {errors.image && <p className={s.error}>{errors.image}</p>} */}
          <img src={gif1} alt="" width="400px"></img>
        </div>
        <div className={s.gif2}>
          <img src={gif2} alt="" width="400px"></img>
        </div>
      </div>
    </div>
  );
}
