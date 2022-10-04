import React from 'react';
import {Link} from "react-router-dom";
import {makeStyles} from "tss-react/mui";
import 'react-toastify/dist/ReactToastify.css';
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import UserMenu from "./Menu/UserMenu";
import Anonymous from "./Menu/Anonymous";
import {ToastContainer} from "react-toastify";

const useStyles = makeStyles()(theme => ({
    mainLink: {
        color: 'inherit',
        textTransform: "uppercase",
        textDecoration: 'none',
        marginLeft: '100px',
        fontWeight: 'bold',
        fontSize: '30px',
        '&:hover': {
            color: 'black'
        },
    },
    staticToolbar: {
        marginBottom: theme.spacing(2)
    },
}));

const AppToolbar = ({color}) => {
    const {classes} = useStyles();
    const user = useSelector(state => state.usersState.user);

    return (
        <>
            <AppBar position="fixed" sx={{background: color}}>
                <ToastContainer/>
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">
                            <Link to="/" className={classes.mainLink}>
                                home
                            </Link>
                        </Typography>
                        <Grid item>
                            {user ? <UserMenu user={user}/> : <Anonymous/>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;