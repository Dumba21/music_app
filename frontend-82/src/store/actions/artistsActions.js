import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";

export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

const fetchArtistsRequest = () => ({type: FETCH_ARTISTS_REQUEST});
const fetchArtistsSuccess = data => ({type: FETCH_ARTISTS_SUCCESS, payload: data});
const fetchArtistsFailure = error => ({type: FETCH_ARTISTS_FAILURE, payload: error});

export const fetchArtists = () => {
    return async dispatch => {
        try {
            dispatch(fetchArtistsRequest());
            const {data} = await axiosApi.get('/artists');
            if (data) {

                dispatch(fetchArtistsSuccess(data))
            }
        } catch (e) {
            dispatch(fetchArtistsFailure(e));
        }
    };
};

export const NEW_ARTIST_REQUEST = 'NEW_ARTIST_REQUEST';
export const NEW_ARTIST_SUCCESS = 'NEW_ARTIST_SUCCESS';
export const NEW_ARTIST_FAILURE = 'NEW_ARTIST_FAILURE';

const newArtistRequest = () => ({type: NEW_ARTIST_REQUEST});
const newArtistSuccess = () => ({type: NEW_ARTIST_SUCCESS});
const newArtistFailure = error => ({type: NEW_ARTIST_FAILURE, payload: error});

export const postNewArtist = data => {
    return async dispatch => {
        try {
            dispatch(newArtistRequest());
            await axiosApi.post('/artists', data);
            dispatch(newArtistSuccess());
            dispatch(historyPush('/'));
        } catch (e) {
            dispatch(newArtistFailure(e));
        }
    };
};

export const DELETE_ARTIST_REQUEST = 'DELETE_ARTIST_REQUEST';
export const DELETE_ARTIST_SUCCESS = 'DELETE_ARTIST_SUCCESS';
export const DELETE_ARTIST_FAILURE = 'DELETE_ARTIST_FAILURE';

const deleteArtistRequest = () => ({type: DELETE_ARTIST_REQUEST});
const deleteArtistSuccess = () => ({type: DELETE_ARTIST_SUCCESS});
const deleteArtistFailure = error => ({type: DELETE_ARTIST_FAILURE, payload: error});

export const deleteArtist = data => {
    return async dispatch => {
        try {
            dispatch(deleteArtistRequest());
            await axiosApi.delete(`/artists/${data}`);
            dispatch(deleteArtistSuccess());
        } catch (e) {
            dispatch(deleteArtistFailure(e));
        }
    };
};

export const PUBLISH_ARTIST_REQUEST = 'PUBLISH_ARTIST_REQUEST';
export const PUBLISH_ARTIST_SUCCESS = 'PUBLISH_ARTIST_SUCCESS';
export const PUBLISH_ARTIST_FAILURE = 'PUBLISH_ARTIST_FAILURE';

const publishArtistRequest = () => ({type: PUBLISH_ARTIST_REQUEST});
const publishArtistSuccess = () => ({type: PUBLISH_ARTIST_SUCCESS});
const publishArtistFailure = error => ({type: PUBLISH_ARTIST_FAILURE, payload: error});

export const publishArtist = id => {
    return async dispatch => {
        try {
            dispatch(publishArtistRequest());
            await axiosApi.post(`/artists/${id}/publish`);
            dispatch(publishArtistSuccess());
        } catch (e) {
            dispatch(publishArtistFailure(e));
        }
    };
};
