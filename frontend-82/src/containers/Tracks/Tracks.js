import React, {useEffect} from 'react';
import {Backdrop, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchTracks} from "../../store/actions/tracksActions";
import {Bars} from "react-loader-spinner";
import TrackBlock from "../../components/TrackBlock/TrackBlock";
import {fetchPostTrack} from "../../store/actions/trackHistoryActions";

const Tracks = ({match}) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.tracksState.loading);
    const tracks = useSelector(state => state.tracksState.data);

    useEffect(() => {
        dispatch(fetchTracks(match.params.id));
    }, [dispatch, match]);

    return tracks && (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography sx={{
                    color: 'white',
                    marginTop: '40px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: '33px'
                }} textAlign={"center"} variant="h5">
                    {tracks ? <p>{tracks[0].album.name}</p> : null}

                    {tracks ? tracks[0].album.artist.name : null}
                </Typography>
                {loading ?
                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={loading}
                    >
                        <Bars
                            height="300"
                            width="300"
                            color="#8718d9"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={loading}
                        />
                    </Backdrop>
                    :
                    <Grid container flexDirection={'row'} spacing={5}
                          sx={{margin: "auto", width: '100%'}}>
                        {tracks.map(e => (
                            <Grid onClick={() => dispatch(fetchPostTrack(e._id))} item key={e._id} md={5} xl={4} sm={9}
                                  xs={10}>
                                <TrackBlock number={e.number} duration={e.duration} name={e.name}/>
                            </Grid>
                        ))
                        }
                    </Grid>
                }
            </Grid>
        </Grid>
    );
};

export default Tracks;