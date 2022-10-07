import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Home from "./containers/Home/Home";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import TrackHistory from "./containers/Tracks_History/Tracks_History";
import NewArtist from "./containers/NewArtist/NewArtist";
import NewAlbum from "./containers/NewAlbum/NewAlbum";
import NewTrack from "./containers/NewTrack/NewTrack";

const App = () => {

    return (
        <Layout>
            <Switch>
                <Route path={'/'} exact component={Home}/>
                <Route path={'/new/album'} component={NewAlbum}/>
                <Route path={'/new/artist'} component={NewArtist}/>
                <Route path={'/new/track'} component={NewTrack}/>
                <Route path='/albums/:id' component={Albums}/>
                <Route path={'/tracks/:id'} component={Tracks}/>
                <Route path={'/track_history'} component={TrackHistory}/>
                <Route path={'/register'} component={Register}/>
                <Route path={'/login'} component={Login}/>
            </Switch>
        </Layout>
    );
}

export default App;
