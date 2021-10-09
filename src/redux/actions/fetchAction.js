export const gettingData = (data) => {
  return {
    type: "FETCH_DATA",
    payload: data,
  };
};

export const changeCharacterIndex = (data) => {
  return {
    type: "CHANGE_INDEX",
    payload: data,
  };
};

export const gettingFilm = (data) => {
  return {
    type: "FETCH_FILM",
    payload: data,
  };
};
