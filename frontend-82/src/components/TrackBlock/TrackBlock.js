import React from 'react';
import {Card, CardContent, Grid} from "@mui/material";
import {makeStyles} from "tss-react/mui";

const TrackBlock = ({name, duration, number}) => {

    const useStyles = makeStyles()(() => ({
        block: {
            height: 150,
            width: 300,
            margin: '0 auto 50px auto',
            textDecoration: "none",
            '&:hover': {
                color: '#b55909'
            }
        },
    }));

    const {classes} = useStyles();

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
        >
            <Card className={classes.block}>
                <CardContent sx={{width: '300px', textAlign: 'center'}}>
                    <strong style={{fontSize: '20px', textTransform: "uppercase"}}>
                        {name}
                    </strong>
                    <p>duration:{duration}</p>
                    <p>№ {number}</p>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default TrackBlock;