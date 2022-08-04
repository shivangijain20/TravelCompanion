import React from 'react';
import googleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js';

const coordinates = { lat : 0, lng : 0 }

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width: 600px)');

    return(
        <div className = {classes.mapContainer}>
            <googleMapReact
            //bootstrapURLKeys = {{ key : '' }}
            defaultCenter = {coordinates}
            center = {coordinates}
            defaultZoom = {14}
            Margin = {[50, 50, 50 ,50]}
            options = {''}
            onChange = {(e) => {
                setCoordinates({ lat: e.center.lat, lng: e.center.lng})
                setBounds({ ne: e.marginbounds.ne, sw: e.marginbounds.sw })
            }}
            onChildClick = {(child) => setChildClicked(child)}
            >
            {places?.map((place, i) => (
                <div
                    className = {classes.markerContainer}
                    latitude = {Number(place.lat)}
                    longitude = {Number(place.lng)}
                    key = {i}
                >
                    {
                        !isDesktop ? (
                            <LocationOnOutlinedIcon color = "primary" fontSize = "large" />
                        ) : (
                            <Paper elevation = {3} className = {classes.paper}>
                                <Typography className = {classes.typography} variant = "subtitle2" gutterBottom>
                                    {places.name}
                                </Typography>
                                <img 
                                    className = {classes.pointer}
                                    src = {place.photo ? place.photo.images.large.url : 'https://img.freepik.com/free-vector/hand-drawn-food-elements_1411-48.jpg?t=st=1658431460~exp=1658432060~hmac=b46b5689cf11cb367750110dddd0fc766723aa22b74e6df46375915aace3387b&w=740'}
                                    alt = {place.name}
                                />
                                <Rating size = "small" value = {Number(place.rating)} readOnly />
                            </Paper>
                        )
                    }
                </div>
            ))}
            </googleMapReact>
        </div>
    );
}

export default Map;