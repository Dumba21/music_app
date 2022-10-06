import React, {useEffect} from 'react';
import {Backdrop, Button, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {deleteTrack, fetchTracks} from "../../store/actions/tracksActions";
import {Bars} from "react-loader-spinner";
import TrackBlock from "../../components/TrackBlock/TrackBlock";
import {fetchPostTrack} from "../../store/actions/trackHistoryActions";

const Tracks = ({match}) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.tracksState.loading);
    const tracks = useSelector(state => state.tracksState.data);
    const user = useSelector(state => state.usersState.user);

    useEffect(() => {
        dispatch(fetchTracks(match.params.id));
    }, [dispatch, match]);

    const deleteHandler = async (e) => {
        await dispatch(deleteTrack(e._id));
        dispatch(fetchTracks(match.params.id));
    };


    return (
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography sx={{
                    color: 'white',
                    marginTop: '40px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: '33px'
                }} textAlign={"center"} variant="h5">
                    {tracks && tracks.length !== 0 ? <p>{tracks[0].album.name}</p> : <p>sorry no track</p>}

                    {tracks && tracks.length !== 0 ? tracks[0].album.artist.name : <p>sorry one more time</p>}
                </Typography>
                {loading ?
                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={loading}
                    >
                        <Bars
                            height="300"
                            width="300"
                            color="#b55909"
                            ariaLabel="bars-loading"
                            visible={loading}
                        />
                    </Backdrop>
                    :
                    <Grid container flexDirection={'row'} spacing={5}
                          sx={{margin: "auto", width: '100%'}}>
                        {tracks && tracks.map(e => (
                            <Grid item key={e._id} md={5} xl={4} sm={9}
                                  xs={10}>
                                <TrackBlock clickOn={() => dispatch(fetchPostTrack(e._id))} number={e.number} duration={e.duration} name={e.name}/>
                                {user && user.role === 'admin' ?
                                    <div style={{display: 'flex',justifyContent:'center'}}>
                                        <Button variant="filled" sx={{background:'white'}} onClick={() => deleteHandler(e)}>delete</Button>
                                        {e.published === false &&
                                            <>
                                        <Button variant="filled" sx={{background:'white'}} onClick={() => console.log('fsdf')}>publish</Button>
                                         <p style={{background: 'black',color:'#fff',padding:10}}>NOT PUBLISHED</p>
                                            </>}
                                    </div>
                                    : null}
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