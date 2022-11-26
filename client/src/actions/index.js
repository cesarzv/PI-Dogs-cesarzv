import axios from 'axios';

export function getDogs() {
  return async function (dispatch) {
    let response = await axios.get('/dogs');
    return dispatch({
      type: 'GET_DOGS',
      payload: response.data,
    });
  };
}

export function getDogName(name) {
  return async function (dispatch) {
    let response = await axios.get(`/dogs?name=${name}`);
    return dispatch({
      type: 'GET_DOG_NAME',
      payload: response.data,
    });
  };
}

export function postDog(payload) {
  return async function () {
    let response = await axios.post('/dogs', payload);
    return response;
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    let response = await axios.get('/temperaments');
    return dispatch({
      type: 'GET_TEMPERAMENTS',
      payload: response.data,
    });
  };
}

export function filterDogsByTemperament(payload) {
  return {
    type: 'FILTER_BY_TEMPERAMENT',
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: 'FILTER_CREATED',
    payload,
  };
}

export function sortByName(payload) {
  return {
    type: 'SORT_BY_NAME',
    payload,
  };
}

export function sortByWeight(payload) {
  return {
    type: 'SORT_BY_WEIGHT',
    payload,
  };
}

export function cleanDog() {
  return {
    type: 'CLEAN_DOG',
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    let response = await axios.get(`/dogs/${id}`);
    return dispatch({
      type: 'GET_DETAILS',
      payload: response.data,
    });
  };
}
