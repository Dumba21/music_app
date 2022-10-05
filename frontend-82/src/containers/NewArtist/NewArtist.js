import React, {useState} from 'react';
import {Backdrop, Button, Grid, TextField} from "@mui/material";
import FileInput from '../../components/UI/Form/FileInput/FileInput';
import {useDispatch, useSelector} from "react-redux";
import {postNewArtist} from "../../store/actions/artistsActions";
import {Bars} from "react-loader-spinner";

const NewProduct = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.artistsState.loading);

    const [state, setState] = useState({
        name: "",
        info: "",
        image: "",
    });

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });

        dispatch(postNewArtist(formData));
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
        <>
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
                            label="Info"
                            name="info"
                            value={state.info}
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
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={loading}
                >
                    <Bars
                        height="300"
                        width="300"
                        color="#1976D2"
                        ariaLabel="bars-loading"
                    />
                </Backdrop>
        </>
    );
};

export default NewProduct;
