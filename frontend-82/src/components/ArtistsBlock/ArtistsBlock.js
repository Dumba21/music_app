import React from 'react';
import {Card, CardContent, CardMedia, Grid} from "@mui/material";
import defaultCover from '../../assets/wepik-photo-mode-2022821-22290.png';
import {Link} from "react-router-dom";
import {apiUrl} from "../../config";

const ArtistsBlock = ({id, title, image, name}) => {

    let cardImage = defaultCover;

    if (image) {
        cardImage = apiUrl + '/' + image;
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
        >
            <Card component={Link} to={`/albums/${id}`}
                  sx={{height: 350, width: 350, margin: '0 auto 50px auto', textDecoration: "none"}} className={'card'}>
                <CardMedia
                    title={title}
                    image={cardImage}
                    sx={{height: '80%', width: '100%', objectFit: 'cover'}}
                />
                <CardContent sx={{width: '300px', textAlign: 'center'}}>
                    <strong style={{fontSize: '20px', textTransform: "uppercase"}}>
                        {name}
                    </strong>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ArtistsBlock;