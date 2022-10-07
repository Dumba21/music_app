import {
    DELETE_ALBUM_FAILURE,
    DELETE_ALBUM_REQUEST, DELETE_ALBUM_SUCCESS,
    FETCH_ALBUMS_FAILURE,
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SUCCESS, NEW_ALBUM_FAILURE,
    NEW_ALBUM_REQUEST, NEW_ALBUM_SUCCESS, PUBLISH_ALBUM_FAILURE, PUBLISH_ALBUM_REQUEST, PUBLISH_ALBUM_SUCCESS
} from "../actions/albumsActions";

const initialState = {
    data:null,
    loading:false,
    error:null,
};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUMS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_ALBUMS_SUCCESS:
            return {...state, loading: false, data: action.payload};
        case FETCH_ALBUMS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case NEW_ALBUM_REQUEST:
            return {...state, loading: true, error: null};
        case NEW_ALBUM_SUCCESS:
            return {...state, loading: false};
        case NEW_ALBUM_FAILURE:
            return {...state, loading: false, error: action.payload};

        case DELETE_ALBUM_REQUEST:
            return {...state, loading: true, error: null};
        case DELETE_ALBUM_SUCCESS:
            return {...state, loading: false};
        case DELETE_ALBUM_FAILURE:
            return {...state, loading: false, error: action.payload};

        case PUBLISH_ALBUM_REQUEST:
            return {...state, loading: true, error: null};
        case PUBLISH_ALBUM_SUCCESS:
            return {...state, loading: false};
        case PUBLISH_ALBUM_FAILURE:
            return {...state, loading: false, error: action.payload};
            
        default:
            return state;
    }
};


export default albumsReducer;