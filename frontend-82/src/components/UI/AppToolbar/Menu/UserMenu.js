import React, {useState} from 'react';
import {Button, Menu, MenuItem} from "@mui/material";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../../store/actions/usersActions";
import {historyPush} from "../../../../store/actions/historyActions";

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


    return (
        <>
            <Button
                id="basic-button"
                color="inherit"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Hello, {user.username}!
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
                <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
