import React, {useState} from 'react';
import {Avatar, Button, Grid, Menu, MenuItem} from "@mui/material";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../../store/actions/usersActions";
import {historyPush} from "../../../../store/actions/historyActions";
import {apiUrl} from "../../../../config";

const UserMenu = ({user}) => {

    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const trackHistoryFun = () => {
        handleClose();
        dispatch(historyPush('/track_history'));
    };

    const addNewArtist = () => {
        handleClose();
        dispatch(historyPush('/new/artist'));
    };

    const addNewAlbum = () => {
        handleClose();
        dispatch(historyPush('/new/album'));
    };
    const addNewTrack = () => {
        handleClose();
        dispatch(historyPush('/new/track'));
    };

    let cardImage = user.avatarImage;

    if (user.avatarImage && (user.avatarImage.match('fixtures') || user.avatarImage.match('upload'))) {
        cardImage = apiUrl + '/' + user.avatarImage
    }

    return (
        <Grid container>
            <Avatar src={cardImage}/>
            <Button
                id="basic-button"
                color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Hello, {user.displayName}!
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => trackHistoryFun()}>Track History</MenuItem>
                <MenuItem onClick={() => addNewArtist()}>Add new Artist</MenuItem>
                <MenuItem onClick={() => addNewAlbum()}>Add new Album</MenuItem>
                <MenuItem onClick={() => addNewTrack()}>Add new Track</MenuItem>
                <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
            </Menu>
        </Grid>
    );
};

export default UserMenu;
