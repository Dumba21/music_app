import React, {useEffect, useState} from 'react';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import FileInput from '../../components/UI/Form/FileInput/FileInput';
import {useDispatch, useSelector} from "react-redux";
import {fetchArtists} from "../../store/actions/artistsActions";
import {postNewAlbum} from "../../store/actions/albumsActions";

const NewAlbum = () => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artistsState.data);

    useEffect(() => {
        dispatch(fetchArtists());
    }, []);

    const [state, setState] = useState({
        name: "",
        releaseDate: 0,
        artist: '',
        description: "",
        image: "",
    });

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });
        dispatch(postNewAlbum(formData));
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setState(prevState => ({...prevState, [name]: file}));
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

                <FormControl fullWidth style={{marginTop: '15px'}}>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="artist"
                        id="artist"
                        name={'artist'}
                        value={state.artist}
                        label="Artist"
                        onChange={inputChangeHandler}
                    >
                        {artists ? artists.map(elem => (
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
                        label="Release Date"
                        name="releaseDate"
                        type='number'
                        value={state.releaseDate}
                        onChange={inputChangeHandler}
                        required
                    />
                </Grid>

                <Grid item>
                    <FileInput
                        label="Image"
                        name="image"
                        onChange={fileChangeHandler}
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

export default NewAlbum;