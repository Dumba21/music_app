import {Route, Switch, useLocation} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Home from "./containers/Home/Home";
import Albums from "./containers/Albums/Albums";
import {useEffect, useState} from "react";
import Tracks from "./containers/Tracks/Tracks";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import TrackHistory from "./containers/Tracks_History/Tracks_History";

const App = () => {
    const location = useLocation();

    const [color, setColor] = useState('#eee');
    const [background, setBackground] = useState('#1a2639');

    useEffect(() => {
        const colors = ['#b55909', '#0a066a', '#5f416c', '#928787'];

        if (location.pathname.includes('/albums')) {
            setColor(colors[1])
        } else if (location.pathname.includes('/tracks')) {
            setColor(colors[0])
        } else if (location.pathname.includes('/login') || location.pathname.includes('/register')) {
            setBackground('#d1d1d8');
            setColor(colors[5]);
        } else if (location.pathname.includes('/track-history')) {
            setColor(colors[2]);
        } else {
            setColor(colors[2]);
            setBackground('#1a2639');
        }
    }, [location]);


    return (
        <Layout
            backColor={background}
            color={color}>
            <Switch>
                <Route path={'/'} exact component={Home}/>
                <Route path='/albums/:id' component={Albums}/>
                <Route path={'/tracks/:id'} component={Tracks}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/register'} component={Register}/>
                <Route path={'/track_history'} component={TrackHistory}/>
            </Switch>
        </Layout>
    );
}

export default App;
