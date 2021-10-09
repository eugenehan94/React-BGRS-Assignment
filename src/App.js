//Drop down of characters - comes from Star Wars api "name" value (under results array)

//List of movies dropdown - comes from Star Wars api "films" array (under results array)
/* Looks like I need to store the id of the select user to fetch the api for the films*/

/*Last year character has been in movie - looks like in the "films"
array, the year of movies are arranged in ascending order. Find last element and leave 
the year*/

/* Fetch appropriate key/pairs from API */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";

/*Material UI imports */
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Spinner from "react-bootstrap/Spinner";
/*Bootstrap imports*/
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import {
  gettingData,
  changeCharacterIndex,
  gettingFilm,
} from "./redux/actions/fetchAction";

/*Material UI useStyles*/
const useStyles = makeStyles({
  input: { background: "yellow" },
});

function App() {
  const classes = useStyles();
  //useState to list the code b/c of map function
  const [loading, setLoading] = useState(true);
  const [innerLoading, setInnerLoading] = useState(true);

  const apiInfo = useSelector((state) => state.apiData);
  const dispatch = useDispatch();

  //state to keep track of id of character when choosen
  //characterFilmArray to store the array of films associated with each character
  const { characterIndex, characterFilmArray, filmList } = apiInfo;

  //Getting the Array with the "name" and "film" from the API
  const { results } = apiInfo.apiData;

  const fetchData = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/people");
      const data = await response.json();
      dispatch(gettingData(data));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFilm = async () => {
    if (!characterFilmArray) {
      return;
    }
    try {
      const response = await Promise.all(
        characterFilmArray[characterIndex].map((item) =>
          fetch(item).then((resp) => resp.json())
        )
      );
      const data = response;
      dispatch(gettingFilm(data));
      setInnerLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchFilm();
  }, [loading, characterIndex]);

  if (loading) {
    return (
      <div
        style={{
          color: "yellow",
        }}
      >
        <Typography variant="h2" align="center">
          Loading...
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  const onChangeHandler = (data) => {
    setInnerLoading(true);
    dispatch(changeCharacterIndex(data));
  };

  return (
    <div className="App">
      <Container fluid="sm">
        {/* Character selection */}
        <Typography variant="h1" gutterBottom>
          Star Wars
        </Typography>
        <InputLabel id="demo-simple-select-label">Character: </InputLabel>
        <Box my={3}>
          <Select
            className={classes.input}
            style={{ minWidth: "30%" }}
            labelId="demo-simple-select-label"
            onChange={(e) => onChangeHandler(e.target.value)}
          >
            {results.map((result, id) => {
              return (
                <MenuItem value={20} key={id} value={id}>
                  {result.name}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        {/*List of movies */}
        <Typography variant="h3">List of Movies</Typography>
        {innerLoading === true ? (
          <Typography variant="h4" color="error">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Typography>
        ) : (
          filmList.map((film, id) => {
            return <h4 key={id}>{film.title}</h4>;
          })
        )}

        {/*year last movie*/}
        <Box my={2} pb={3}>
          <Typography variant="h3">Last seen in year: </Typography>
          {innerLoading === true ? (
            <div></div>
          ) : (
            filmList.slice(-1).map((film, id) => {
              return (
                <Typography variant="h5" key={id}>
                  {film.release_date.substring(0, 4)}
                </Typography>
              );
            })
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;
