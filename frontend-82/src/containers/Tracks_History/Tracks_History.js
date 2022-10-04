import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchTracksHistory} from "../../store/actions/trackHistoryActions";
import {Backdrop, Grid, List, ListItem, Typography} from "@mui/material";
import {Bars} from "react-loader-spinner";
import {Redirect} from "react-router-dom";
import {makeStyles} from "tss-react/mui";


const TrackHistory = ({match}) => {

    const tracksHistory = useSelector(state => state.tracksHistoryState.tracksHistory);
    const loading = useSelector(state => state.tracksState.loading);
    const user = useSelector(state => state.usersState.user);
    const dispatch = useDispatch();

    const useStyles = makeStyles()(() => ({
        label: {
            color: 'white',
            marginTop: '40px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: '33px',
            textAlign: 'center'
        },
        list:{
            display:'flex',
            alignItems:'center',
            flexDirection:'column'
        },
        listItem: {
            background: '#fff',
            width:'60%',
            justifyContent: 'space-between',
            borderBottom: '2px solid black',
            marginBottom: 3,
        }
    }));
    const {classes} = useStyles();


    useEffect(() => {
        dispatch(fetchTracksHistory());
    }, [dispatch, match.params.id]);

    if (!user) {
        return <Redirect to={'/'}/>
    }


    let tracksHistoryComponents = (
        <Typography className={classes.label} variant="h5">
            You dont have<br/> tracks in your history
        </Typography>
    )

    if (tracksHistory !== null && tracksHistory.length !== 0) {

        tracksHistoryComponents =
            <Grid item xs={12} md={6}>
                <Typography className={classes.label} variant="h6">
                    Track History
                </Typography>
                <List className={classes.list}>
                    {tracksHistory.map(elem => {

                        const date = elem.datetime.substring(0, 10);
                        const time = elem.datetime.substring(11, 19);

                        return (
                            <ListItem key={elem._id} className={classes.listItem}>
                                <p><b>Name: </b>{elem.user.username}</p>
                                <p><b>Song: </b> {elem.track.name}</p>
                                <p>{time}<b style={{marginLeft:'30px'}}>{date}</b></p>
                            </ListItem>
                        )
                    })}
                </List>
            </Grid>
    }
    return (
        loading ?
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <Bars
                    height="300"
                    width="300"
                    color="#0a066a"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={loading}
                />
            </Backdrop>
            :
            tracksHistoryComponents
    );
};

export default TrackHistory;
