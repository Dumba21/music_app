import axiosApi from "../../axiosApi";

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

const fetchTracksRequest = () => ({type:FETCH_TRACKS_REQUEST});
const fetchTracksSuccess = data => ({type:FETCH_TRACKS_SUCCESS,payload:data});
const fetchTracksFailure = error => ({type:FETCH_TRACKS_FAILURE,payload:error});

export const fetchTracks = id => {
    return async dispatch => {
        try{
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

const postTracksRequest = () => ({type:POST_TRACKS_REQUEST});
const postTracksSuccess = data => ({type:POST_TRACKS_SUCCESS,payload:data});
const postTracksFailure = error => ({type:POST_TRACKS_FAILURE,payload:error});

export const postTrack = trackId => {
    return async dispatch => {
        try{
            dispatch(postTracksRequest());
            const {data} = await axiosApi.post('track_history', {track: trackId});
            if (data) {
                dispatch(postTracksSuccess(data));
            }
        } catch (e) {
            dispatch(postTracksFailure(e))
        }
    };
};