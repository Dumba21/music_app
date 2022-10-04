import axiosApi from "../../axiosApi";

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
                dispatch(fetchArtistsSuccess(data));
            }
        } catch (e) {
            dispatch(fetchArtistsFailure(e));
        }
    };
};

export const FETCH_SINGLE_ARTIST_REQUEST = 'FETCH_SINGLE_ARTIST_REQUEST';
export const FETCH_SINGLE_ARTIST_SUCCESS = 'FETCH_SINGLE_ARTIST_SUCCESS';
export const FETCH_SINGLE_ARTIST_FAILURE = 'FETCH_SINGLE_ARTIST_FAILURE';

const fetchSingleArtistsRequest = () => ({type: FETCH_SINGLE_ARTIST_REQUEST});
const fetchSingleArtistsSuccess = data => ({type: FETCH_SINGLE_ARTIST_SUCCESS, payload: data});
const fetchSingleArtistsFailure = error => ({type: FETCH_SINGLE_ARTIST_FAILURE, payload: error});

export const singleArtist = id => {
    return async dispatch => {
        try {
            dispatch(fetchSingleArtistsRequest());
            const {data} = await axiosApi.get(`/artists/${id}`);
            if (data) {
                dispatch(fetchSingleArtistsSuccess(data));
            }
        } catch (e) {
            dispatch(fetchSingleArtistsFailure(e));
        }
    };
};