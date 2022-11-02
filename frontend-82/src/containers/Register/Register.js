import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from "tss-react/mui";
import {Avatar, Container, Grid, Link, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {LockOutlined} from "@mui/icons-material";
import FormElement from "../../components/UI/Form/FormInput";
import {clearRegisterErrors, registerUser} from "../../store/actions/usersActions";
import ButtonWithProgress from "../../components/ButtonWithProgress/ButtonWithProgress";
import FileInput from "../../components/UI/Form/FileInput/FileInput";
import {toast} from "react-toastify";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        background: 'rgba(0,0,0,0.76)'
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: `${theme.spacing(2, 0)} !important`,
    },
    signInButton: {
        width: '100%',
        background: 'rgba(0,0,0,0.76)',
        margin: theme.spacing(2, 0),
        '&:hover': {
            background: 'black'
        }
    }
}));

const Register = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.usersState.registerError);
    const loading = useSelector(state => state.usersState.registerLoading);

    const [user, setUser] = useState({
        email: '',
        password: '',
        displayName: '',
        avatarImage: '',
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
        const formData = new FormData();

        if (user.avatarImage === '') {
           return  toast.error('Please choose avatar',{position: 'bottom-left', autoClose: 3500})
        }

        Object.keys(user).forEach(key => {
            formData.append(key, user[key]);
        });
        dispatch(registerUser(formData));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setUser(prevState => ({...prevState, [name]: file}));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h6" style={{color:'white'}}>
                    Sign up
                </Typography>

                <Grid
                    component="form"
                    onSubmit={submitFormHandler}
                    container
                    spacing={2}
                    justifyContent={'flex-end'}
                >
                    <FormElement
                        required={true}
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={inputChangeHandler}
                        error={getFieldError('email')}
                    />
                    <FormElement
                        required={true}
                        label="Display name"
                        name="displayName"
                        value={user.displayName}
                        onChange={inputChangeHandler}
                        error={getFieldError('displayName')}
                    />

                    <FormElement
                        type="password"
                        required={true}
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={inputChangeHandler}
                        error={getFieldError('password')}
                    />

                    <FileInput
                        required={true}
                        type={'file'}
                        name="avatarImage"
                        value={user.avatarImage}
                        onChange={fileChangeHandler}
                        error={getFieldError('displayName')}
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
                        {/*<Button variant={'contained'} className={classes.signInButton}>Sign in</Button>*/}
                    </Grid>
                </Grid>

                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link style={{color:'white'}} component={RouterLink} to="/login">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;