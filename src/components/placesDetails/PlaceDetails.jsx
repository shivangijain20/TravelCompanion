import React from 'react';
import {Box, Typography, Card, CardMedia, CardContent, CardActions, Chip, Button} from '@material-ui/core'; 
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from './styles.js';

const PlaceDetails = ({ place, selected, refProp }) => {
    const classes = useStyles();

    if(selected) refProp?.current?.scrollIntoView({behaviour : "smooth", block : "start" })

    return(
        <Card elevation = {6}>
            <CardMedia 
            style = {{height : 350}}
            image = {place.photo ? place.photo.images.large.url : 'https://img.freepik.com/free-vector/hand-drawn-food-elements_1411-48.jpg?t=st=1658431460~exp=1658432060~hmac=b46b5689cf11cb367750110dddd0fc766723aa22b74e6df46375915aace3387b&w=740'}
            title = {place.name}
            />
            <CardContent>
                <Typography gutterBottom variant = "h5">{place.name}</Typography>
                <Box display = "flex" justifyContent = "space-between">
                    <Typography variant = "subtitle1">Price</Typography>
                    <Typography gutterBottom variant = "subtitle1">{place.price_level}</Typography>
                </Box>
                <Box display = "flex" justifyContent = "space-between">
                    <Rating size = "small" value = {Number(place.rating)} readOnly />
                    <Typography gutterBottom variant = "subtitle1">out of {place.num_reviews} reviews</Typography>
                </Box>
                <Box display = "flex" justifyContent = "space-between">
                    <Typography variant = "subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant = "subtitle1">{place.ranking}</Typography>
                </Box>
                {place?.awards?.map(() => (                   //dynamic block
                    <Box my = {1} display = "flex" justifyContent = "space-between" alignItem = "center">
                        <img src = {award.images.small} alt = {award.display.name} />
                        <Typography variant = "subtitle2" color = "textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({name}) => (           //dynamic block
                    <Chip key = {name} size = "small" label = {name} className = {classes.chip} />
                ))}
                {place.address && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon />{place.address}
                    </Typography>
                )}
                {place.phone && (
                    <Typography variant="subtitle2" color="textSecondary" className={classes.spacing}>
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                    Trip Advisor
                </Button>
                <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                    Website
                </Button>
            </CardActions>
        </Card>
    );
}

export default PlaceDetails;