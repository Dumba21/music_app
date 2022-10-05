import React, {useEffect, useState} from 'react';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchArtists} from "../../store/actions/artistsActions";
import {fetchAlbums} from "../../store/actions/albumsActions";


const NewTrack = () => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artistsState.data);
    const albums = useSelector(state => state.albumsState.data);

    const [state, setState] = useState({
        name: '',
        album: '',
        duration: '',
        number: 0,
        image: "",
    });

    const [artist, setArtist] = useState('')

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAlbums(artist));
    }, [artist]);

    useEffect(() => {
        if (artist === '' && state.album !== '') {
            const currentAlbum = albums.find(elem => elem._id === state.album);
            const certainArtist = artists.find(elem => elem._id === currentAlbum.artist);
            setArtist(certainArtist._id);
        }
    }, [state]);


    const submitFormHandler = e => {
        e.preventDefault();
        //
        // const formData = new FormData();
        // Object.keys(state).forEach(key => {
        //     formData.append(key, state[key]);
        // });
        // dispatch(postNewAlbum(formData));

        console.log({artist, state})
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid
                container
                maxWidth="md"
                textAlign="center"
                marginX="auto"
                direction="column"
                rowSpacing={2}
            >

                <FormControl required fullWidth style={{marginTop: '15px'}}>
                    <InputLabel id="category">Artist</InputLabel>
                    <Select
                        labelId="artist"
                        id="artist"
                        name={'artist'}
                        value={artist}
                        label="Artist"
                        onChange={e => setArtist(e.target.value)}
                    >
                        {artists ? artists.map(elem => (
                            <MenuItem key={elem._id} value={elem._id}>{elem.name}</MenuItem>
                        )) : null}
                    </Select>
                </FormControl>

                <FormControl required fullWidth style={{marginTop: '15px'}}>
                    <InputLabel id="category">Album</InputLabel>
                    <Select
                        labelId="Album"
                        id="Album"
                        name={'album'}
                        value={state.album}
                        label="album"
                        onChange={inputChangeHandler}
                    >
                        {albums ? albums.map(elem => (
                            <MenuItem key={elem._id} value={elem._id}>{elem.name}</MenuItem>
                        )) : null}
                    </Select>
                </FormControl>

                <Grid item>
                    <TextField
                        label="Name"
                        name="name"
                        value={state.name}
                        onChange={inputChangeHandler}
                        required
                    />
                </Grid>

                <Grid item>
                    <TextField
                        label="Duration"
                        name="duration"
                        value={state.duration}
                        onChange={inputChangeHandler}
                        required
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Number"
                        name="number"
                        type="number"
                        value={state.number}
                        onChange={inputChangeHandler}
                        required
                    />
                </Grid>

                <Grid item>
                    <Button type="submit" color="error" variant="contained">Create</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default NewTrack;