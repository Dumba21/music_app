import axiosApi from "../../axiosApi";


export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

const fetchAlbumsRequest = () => ({type: FETCH_ALBUMS_REQUEST});
const fetchAlbumsSuccess = data => ({type: FETCH_ALBUMS_SUCCESS, payload: data});
const fetchAlbumsFailure = error => ({type: FETCH_ALBUMS_FAILURE, payload: error});



export const fetchAlbums = id => {
    return async dispatch => {
        try {
            dispatch(fetchAlbumsRequest());
            const {data} = await axiosApi.get(`/albums?artist=${id}`);
            if (data) {
                dispatch(fetchAlbumsSuccess(data));
            }

        } catch (e) {
            dispatch(fetchAlbumsFailure(e));
        }
    };
};