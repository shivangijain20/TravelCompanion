import React, {useState, useEffect} from 'react';
//import './App.css';
import {CssBaseline, Grid} from '@material-ui/core';
import Header from './components/header/Header';
import List from './components/list/List';
import Map from './components/map/Map';
//import PlaceDetails from './components/placeDetails';

import {getPlacesData} from './api';

const App = () => {

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((places) => places.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne)
       .then((data) => {
        console.log(data);
        setPlaces(data);
        setFilteredPlaces([])
        setIsLoading(false);
       })
  }, [type, coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates = {setCoordinates} />
      <Grid container spacing = {3} style = {{ width : '100%'}}>
        <Grid type xs = {12} md = {4}>
          <List
            places = {filteredPlaces.length ? filteredPlaces : places} 
            childClicked = {childClicked}
            isLoading = {isLoading}
            type = {type}
            setType = {setType}
            rating = {rating}
            setRating = {setRating}
          />
        </Grid>
        <Grid type xs = {12} md = {8}>
          <Map 
          setCoordinates = {setCoordinates}
          setBounds = {setBounds}
          coordinates = {coordinates}
          places = {filteredPlaces.length ? filteredPlaces : places}
          setChildClicked = {setChildClicked}
          />
        </Grid> 
      </Grid>
    </>
  )
}

export default App;

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/


