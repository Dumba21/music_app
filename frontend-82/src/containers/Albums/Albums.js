import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAlbums} from "../../store/actions/albumsActions";
import {Backdrop, Grid, Typography} from "@mui/material";
import {Bars} from "react-loader-spinner";
import AlbumBlock from "../../components/AlbumBlock/AlbumBlock";

const Albums = ({match}) => {
    const albums = useSelector(state => state.albumsState.data);
    const loading = useSelector(state => state.albumsState.loading);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchAlbums(match.params.id));
    }, [dispatch,match]);

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
                        {albums[0].artist.name ? albums[0].artist.name : <p>Sorry name was not found</p>}
                    </Typography>
                    <Grid container flex={'row'} justifyContent={"start"} spacing={5}
                          sx={{margin: "auto", width: '100%'}}>
                        {albums.map(e => (
                            <Grid item key={e._id} md={5} xl={4} sm={9} xs={10}>
                                <AlbumBlock id={e._id} title={e.name} cardImage={e.image} name={e.name}
                                            releaseDate={e.releaseDate} image={e.image}/>
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