import React from 'react';
import {Link} from "react-router-dom";
import {Card, CardContent, CardMedia, Grid} from "@mui/material";

import {apiUrl} from "../../config";
import defaultCover from "../../assets/defaultAlbumCover.png";

const AlbumBlock = ({id, title, image, releaseDate}) => {
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
            <Card component={Link} to={`/tracks/${id}`}
                  sx={{height: 400, width: 350, margin: '0 auto 50px auto', textDecoration: "none"}}
                  className={'albumBlock'}>
                <CardMedia
                    title={title}
                    image={cardImage}
                    sx={{height: '80%', width: '100%', objectFit: 'cover'}}
                />
                <CardContent sx={{width: '300px', textAlign: 'center'}}>
                    <strong style={{fontSize: '20px', textTransform: "uppercase"}}>
                        {title}
                    </strong>
                    <p>
                        Release date:<b>{releaseDate}</b>
                    </p>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default AlbumBlock;