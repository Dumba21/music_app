import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import {ThemeProvider} from "@mui/material";

import './index.css';
import App from './App';
import theme from "./theme";
import history from "./history";
import store from "./store/configureStore";


const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <App/>
            </Router>
        </ThemeProvider>
    </Provider>
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);