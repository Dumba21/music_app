import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const FETCH_TRACKS_HISTORY_REQUEST = 'FETCH_TRACKS_HISTORY_REQUEST';
export const FETCH_TRACKS_HISTORY_SUCCESS = 'FETCH_TRACKS_HISTORY_SUCCESS';
export const FETCH_TRACKS_HISTORY_FAILURE = 'FETCH_TRACKS_HISTORY_FAILURE';

export const FETCH_POST_TRACK_REQUEST = 'FETCH_POST_TRACK_REQUEST';
export const FETCH_POST_TRACK_SUCCESS = 'FETCH_POST_TRACK_SUCCESS';
export const FETCH_POST_TRACK_FAILURE = 'FETCH_POST_TRACK_FAILURE';

const fetchTracksHistoryRequest = () => ({type: FETCH_TRACKS_HISTORY_REQUEST});
const fetchTracksHistorySuccess = data => ({type: FETCH_TRACKS_HISTORY_SUCCESS, payload: data});
const fetchTracksHistoryFailure = error => ({type: FETCH_TRACKS_HISTORY_FAILURE, payload: error});

const fetchPostTracksRequest = () => ({type: FETCH_POST_TRACK_REQUEST});
const fetchPostTracksSuccess = () => ({type: FETCH_POST_TRACK_SUCCESS});
const fetchPostTracksFailure = error => ({type: FETCH_POST_TRACK_FAILURE, payload: error});

export const fetchTracksHistory = () => {
    return async dispatch => {
        try {
            dispatch(fetchTracksHistoryRequest());

            const {data} = await axiosApi(`/track_history`);

            if (data) {
                dispatch(fetchTracksHistorySuccess(data));
            }

        } catch (e) {
            dispatch(fetchTracksHistoryFailure(e))
        }
    };
};

export const fetchPostTrack = trackId => {
    return async dispatch => {
        try {

            dispatch(fetchPostTracksRequest());
            const {data} = await axiosApi.post(`/track_history`, {track: trackId});
            if (data) {
                dispatch(fetchPostTracksSuccess(data));
            }
        } catch (e) {
            toast.error('You need to login', {position: 'bottom-left', autoClose: 3500})
            dispatch(fetchPostTracksFailure(e));
        }
    };
};