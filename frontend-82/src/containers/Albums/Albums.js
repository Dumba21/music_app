import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteAlbum, fetchAlbums, publishAlbum} from "../../store/actions/albumsActions";
import {Backdrop, Button, Grid, Typography} from "@mui/material";
import {Bars} from "react-loader-spinner";
import AlbumBlock from "../../components/AlbumBlock/AlbumBlock";

const Albums = ({match}) => {
    const albums = useSelector(state => state.albumsState.data);
    const loading = useSelector(state => state.albumsState.loading);
    const user = useSelector(state => state.usersState.user);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchAlbums(match.params.id));
    }, [dispatch, match]);

    const deleteHandler = async (e) => {
        await dispatch(deleteAlbum(e._id));
        dispatch(fetchAlbums(match.params.id));
    };

    const publishHandler = async (e) => {
        await dispatch(publishAlbum(e._id));
        dispatch(fetchAlbums(match.params.id));
    };

    let albumsComponents = (
        <Typography sx={{
            color: 'white',
            marginTop: '40px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: '33px'
        }} textAlign={"center"} variant="h5">
            Sorry there's no albums yet
        </Typography>
    )

    if (albums !== null && albums.length !== 0) {
        albumsComponents = (
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography sx={{
                        color: 'white',
                        marginTop: '40px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: '33px'
                    }} textAlign={"center"} variant="h5">
                        {albums[0].artist.name}
                    </Typography>
                    <Grid container flex={'row'} justifyContent={"start"} spacing={5}
                          sx={{margin: "auto", width: '100%'}}>
                        {albums.map(e => (
                            <Grid
                                item key={e._id} md={5} xl={4} sm={9} xs={10}
                            >
                                <AlbumBlock
                                    id={e._id}
                                    title={e.name}
                                    cardImage={e.image}
                                    name={e.name}
                                    releaseDate={e.releaseDate}
                                    image={e.image}
                                />
                                {user && user.role === 'admin' ?
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <Button variant="filled" sx={{background: 'white'}}
                                                onClick={() => deleteHandler(e)}>delete</Button>
                                        {e.published === false &&
                                            <>
                                                <Button variant="filled" sx={{background: 'white'}}
                                                        onClick={() => publishHandler(e)}>publish</Button>
                                                <p style={{background: 'black', color: '#fff', padding: 10}}>NOT
                                                    PUBLISHED</p>
                                            </>}
                                    </div>
                                    : null}

                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    return (
        loading ?
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <Bars
                    height="300"
                    width="300"
                    color="#0a066a"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={loading}
                />
            </Backdrop>
            :
            albumsComponents
    );
};

export default Albums;