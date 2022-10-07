import React, {useEffect, useState} from 'react';
import {Container, CssBaseline, IconButton} from "@mui/material";
import AppToolbar from "../AppToolbar/AppToolbar";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {makeStyles} from "tss-react/mui";

const Layout = ({children}) => {
    const [mode, setMode] = useState(true);
    const lightColor = '#9222c3';
    const darkColor = '#5f416c'
    const useStyles = makeStyles()(() => ({
        darkBackground: {
            background: '#0a066a',
        },
        lightBackground: {
            background: '#2a23d7',
        },
        buttonLight: {
            display: 'flex',
            width: '100',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            color: '#fff',
            borderRadius: 1,
            p: 3,
            '&:hover': {
                background: '#fff'
            }
        },
        buttonDark: {
            display: 'flex',
            width: '100',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: 1,
            p: 3,
            '&:hover': {
                background: '#000'
            }
        }
    }));
    const {classes} = useStyles();

    useEffect(() => {
        let theme = localStorage.getItem('mode');
        setMode(theme === 'true');

        if (theme === undefined) {
            return setMode(true);
        }

    }, []);

    const modeHandler = () => {
        const a = localStorage.getItem('mode');
        setMode(a === 'false');

        if (a === 'false') {
            localStorage.setItem('mode', 'true');
        } else {
            localStorage.setItem('mode', 'false');
        }
    }


    return (
        <div style={{minHeight: '100vh'}} className={mode ? classes.darkBackground : classes.lightBackground}>
            <CssBaseline/>
            <AppToolbar color={mode ? darkColor : lightColor}>
                <IconButton className={mode ? classes.buttonDark : classes.buttonLight} onClick={modeHandler}
                            color="inherit">
                    {mode ? <Brightness4Icon/> : <Brightness7Icon style={{color: 'black'}}/>}
                </IconButton>
            </AppToolbar>
            <main>
                <Container maxWidth="xl">
                    {children}
                </Container>
            </main>
        </div>
    );
};

export default Layout;