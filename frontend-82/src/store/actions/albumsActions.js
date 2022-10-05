import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";


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

export const NEW_ALBUM_REQUEST = 'NEW_ALBUM_REQUEST';
export const NEW_ALBUM_SUCCESS = 'NEW_ALBUM_SUCCESS';
export const NEW_ALBUM_FAILURE = 'NEW_ALBUM_FAILURE';

const newAlbumRequest = () => ({type:NEW_ALBUM_REQUEST});
const newAlbumSuccess = () => ({type:NEW_ALBUM_SUCCESS});
const newAlbumFailure = error => ({type:NEW_ALBUM_FAILURE,payload:error});

export const postNewAlbum = data => {
    return async dispatch => {
        try{
            dispatch(newAlbumRequest());
            await axiosApi.post('/albums', data);
            dispatch(newAlbumSuccess());
            dispatch(historyPush('/'));
        } catch (e) {
            dispatch(newAlbumFailure(e));
        }
    }
}