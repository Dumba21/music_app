import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {LockOpenOutlined} from "@mui/icons-material";
import {Alert, Avatar, Container, Grid, Link, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";

import {clearRegisterErrors, loginUser} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/Form/FormInput";
import ButtonWithProgress from "../../components/ButtonWithProgress/ButtonWithProgress";


const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        background:'rgba(0,0,0,0.76)'
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: `${theme.spacing(2, 0)} !important`,
    },
    alert: {
        margin: theme.spacing(3, 0),
        width: '100%',
    },
    signInButton:{
        width: '100%',
        background:'rgba(0,0,0,0.76)',
        margin: theme.spacing(2,0),
        '&:hover':{
            background:'black'
        }
    }
}));

const Login = () => {
    const { classes } = useStyles();

    const dispatch = useDispatch();
    const error = useSelector(state => state.usersState.loginError);
    const loading = useSelector(state => state.usersState.loginLoading);

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        return () => {
            dispatch(clearRegisterErrors());
        }
    }, [dispatch]);

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(loginUser({...user}));
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenOutlined/>
                </Avatar>
                <Typography component="h1" variant="h6">
                    Sign in
                </Typography>

                {error && (
                    <Alert severity="error" className={classes.alert}>
                        Error! {error.message}
                    </Alert>
                )}

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                >
                    <FormElement
                        required={true}
                        label="Username"
                        name="username"
                        value={user.username}
                        onChange={inputChangeHandler}
                    />
                    <FormElement
                        type="password"
                        required={true}
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                    />

                    <Grid item xs={12}>
                        <ButtonWithProgress
                            loading={loading}
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </ButtonWithProgress>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/register">
                            Or sign up
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Login;