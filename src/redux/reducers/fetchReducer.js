const initialState = {
  apiData: [],
  characterIndex: 0,
  characterFilmArray: null,
  filmList: null,
};

export const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        apiData: action.payload,
        characterFilmArray: action.payload.results.map((item) => item.films),
      };
    case "CHANGE_INDEX":
      return {
        ...state,
        characterIndex: action.payload,
      };
    case "FETCH_FILM":
      return {
        ...state,
        filmList: action.payload,
      };
    default:
      return state;
  }
};
