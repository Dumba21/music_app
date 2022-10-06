import React from 'react';
import {Card, CardContent, Grid} from "@mui/material";
import {makeStyles} from "tss-react/mui";

const TrackBlock = ({name, duration, number,clickOn}) => {

    const useStyles = makeStyles()(() => ({
        block: {
            height: 150,
            width: 300,
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
            onClick={clickOn}
            sx={{cursor:'pointer',border:'2px solid white',marginBottom:5}}
        >
            <Card className={classes.block}>
                <CardContent sx={{ textAlign: 'center'}}>
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