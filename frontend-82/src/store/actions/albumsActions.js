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

const newAlbumRequest = () => ({type: NEW_ALBUM_REQUEST});
const newAlbumSuccess = () => ({type: NEW_ALBUM_SUCCESS});
const newAlbumFailure = error => ({type: NEW_ALBUM_FAILURE, payload: error});

export const postNewAlbum = data => {
    return async dispatch => {
        try {
            dispatch(newAlbumRequest());
            const response = await axiosApi.post('/albums', data);
            dispatch(newAlbumSuccess());
            console.log(response.data)
            dispatch(historyPush(`/albums/${response.data.artist}`));
        } catch (e) {
            dispatch(newAlbumFailure(e));
        }
    };
};

export const PUBLISH_ALBUM_REQUEST = 'PUBLISH_ALBUM_REQUEST';
export const PUBLISH_ALBUM_SUCCESS = 'PUBLISH_ALBUM_SUCCESS';
export const PUBLISH_ALBUM_FAILURE = 'PUBLISH_ALBUM_FAILURE';

const publishAlbumRequest = () => ({type:PUBLISH_ALBUM_REQUEST});
const publishAlbumSuccess = () => ({type:PUBLISH_ALBUM_SUCCESS});
const publishAlbumFailure = error => ({type:PUBLISH_ALBUM_FAILURE,payload:error});

export const publishAlbum = id => {
    return async dispatch => {
        try{
            dispatch(publishAlbumRequest());
            await axiosApi.post(`/albums/${id}/publish`);
            dispatch(publishAlbumSuccess());
        } catch (e) {
            dispatch(publishAlbumFailure(e));
        }
    };
};


export const DELETE_ALBUM_REQUEST = 'DELETE_ALBUM_REQUEST';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';
export const DELETE_ALBUM_FAILURE = 'DELETE_ALBUM_FAILURE';

const deleteAlbumRequest = () => ({type: DELETE_ALBUM_REQUEST});
const deleteAlbumSuccess = () => ({type: DELETE_ALBUM_SUCCESS});
const deleteAlbumFailure = error => ({type: DELETE_ALBUM_FAILURE, payload: error});

export const deleteAlbum = data => {
    return async dispatch => {
        try {
            dispatch(deleteAlbumRequest());
            await axiosApi.delete(`/albums/${data}`);
            dispatch(deleteAlbumSuccess());
        } catch (e) {
            dispatch(deleteAlbumFailure(e));
        }
    }
}
