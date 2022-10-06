import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
const fetchTracksSuccess = data => ({type: FETCH_TRACKS_SUCCESS, payload: data});
const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, payload: error});

export const fetchTracks = id => {
    return async dispatch => {
        try {
            dispatch(fetchTracksRequest());
            const {data} = await axiosApi.get(`/tracks?album=${id}`);

            if (data) {
                dispatch(fetchTracksSuccess(data));
            }
        } catch (e) {
            dispatch(fetchTracksFailure(e))
        }
    };
};

export const POST_TRACKS_REQUEST = 'POST_TRACKS_REQUEST';
export const POST_TRACKS_SUCCESS = 'POST_TRACKS_SUCCESS';
export const POST_TRACKS_FAILURE = 'POST_TRACKS_FAILURE';

const postTracksRequest = () => ({type: POST_TRACKS_REQUEST});
const postTracksSuccess = () => ({type: POST_TRACKS_SUCCESS});
const postTracksFailure = error => ({type: POST_TRACKS_FAILURE, payload: error});

export const postNewTrack = track => {
    return async dispatch => {
        try {
            dispatch(postTracksRequest());
            const {data} = await axiosApi.post('/tracks', track);
            if (data) {
                dispatch(postTracksSuccess(data));
                dispatch(historyPush('/'));
            }
        } catch (e) {
            dispatch(postTracksFailure(e))
        }
    };
};

export const DELETE_TRACK_REQUEST = 'DELETE_TRACK_REQUEST';
export const DELETE_TRACK_SUCCESS = 'DELETE_TRACK_SUCCESS';
export const DELETE_TRACK_FAILURE = 'DELETE_TRACK_FAILURE';

const deleteTrackRequest = () => ({type: DELETE_TRACK_REQUEST});
const deleteTrackSuccess = () => ({type: DELETE_TRACK_SUCCESS});
const deleteTrackFailure = error => ({type: DELETE_TRACK_FAILURE, payload: error});

export const deleteTrack = data => {
    return async dispatch => {
        try {
            dispatch(deleteTrackRequest());
            await axiosApi.delete(`/tracks/${data}`);
            dispatch(deleteTrackSuccess());
        } catch (e) {
            dispatch(deleteTrackFailure(e));
        }
    };
};