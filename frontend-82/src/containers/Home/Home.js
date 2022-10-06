import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteArtist, fetchArtists} from "../../store/actions/artistsActions";
import {Backdrop, Button, Grid, Typography} from "@mui/material";
import {Bars} from "react-loader-spinner";
import ArtistsBlock from "../../components/ArtistsBlock/ArtistsBlock";

const Home = () => {
    const artists = useSelector(state => state.artistsState.data);
    const loading = useSelector(state => state.artistsState.loading);
    const user = useSelector(state => state.usersState.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    const deleteHandler = async (e) => {
        await dispatch(deleteArtist(e._id));
        dispatch(fetchArtists());
    }

    return artists && (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography sx={{
                        color: 'white',
                        marginTop: '40px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: '33px'
                    }} textAlign={"center"} variant="h5">
                        Artists
                    </Typography>
                </Grid>
            </Grid>
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
                <Grid container flex={'row'} justifyContent={"start"} spacing={5} sx={{margin: "auto", width: '100%'}}>

                    {artists.map(e => (
                        <Grid item key={e._id} md={5} xl={4} sm={9} xs={10}>
                            <ArtistsBlock id={e._id} title={e.name} cardImage={e.image} name={e.name} image={e.image}/>

                            {user && user.role === 'admin' ?
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <Button variant="filled" sx={{background: 'white'}}
                                            onClick={() => deleteHandler(e)}>delete</Button>
                                    {e.published === false &&
                                        <>
                                            <Button variant="filled" sx={{background: 'white'}}
                                                    onClick={() => console.log('fsdf')}>publish</Button>
                                            <p style={{background: 'black', color: '#fff', padding: 10}}>NOT
                                                PUBLISHED</p>
                                        </>}
                                </div>
                                : null}

                        </Grid>
                    ))
                    }
                </Grid>
            }
        </>
    );
};

export default Home;