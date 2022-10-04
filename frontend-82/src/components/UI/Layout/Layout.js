import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolbar/AppToolbar";

const Layout = ({children,backColor,color}) => {
    return (
        <div style={{background:backColor,minHeight:'100vh'}}>
            <CssBaseline/>
            <AppToolbar color={color}/>
            <main>
                <Container maxWidth="xl">
                    {children}
                </Container>
            </main>
        </div>
    );
};

export default Layout;