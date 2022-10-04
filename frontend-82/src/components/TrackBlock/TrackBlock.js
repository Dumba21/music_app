import React from 'react';
import {Card, CardContent, Grid} from "@mui/material";

const TrackBlock = ({name,duration,number}) => {

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
        >
            <Card sx={{height: 150,width:300,margin:'0 auto 50px auto',textDecoration:"none"}} className={'trackCard'}>
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