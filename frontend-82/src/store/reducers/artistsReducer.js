import {
    DELETE_ARTIST_FAILURE,
    DELETE_ARTIST_REQUEST,
    DELETE_ARTIST_SUCCESS,
    FETCH_ARTISTS_FAILURE,
    FETCH_ARTISTS_REQUEST,
    FETCH_ARTISTS_SUCCESS,
    NEW_ARTIST_FAILURE,
    NEW_ARTIST_REQUEST,
    NEW_ARTIST_SUCCESS, PUBLISH_ARTIST_FAILURE,
    PUBLISH_ARTIST_REQUEST,
    PUBLISH_ARTIST_SUCCESS,
} from "../actions/artistsActions";

const initialState = {
    data: null,
    singleArtist: null,
    loading: false,
    error: null
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTISTS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_ARTISTS_SUCCESS:
            return {...state, loading: false, data: action.payload};
        case FETCH_ARTISTS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case NEW_ARTIST_REQUEST:
            return {...state, loading: true, error: null};
        case NEW_ARTIST_SUCCESS:
            return {...state, loading: false};
        case NEW_ARTIST_FAILURE:
            return {...state, loading: false, error: action.payload};

        case DELETE_ARTIST_REQUEST:
            return {...state, loading: true, error: null};
        case DELETE_ARTIST_SUCCESS:
            return {...state, loading: false};
        case DELETE_ARTIST_FAILURE:
            return {...state, loading: false, error: action.payload};

        case PUBLISH_ARTIST_REQUEST:
            return {...state, loading: true, error: null};
        case PUBLISH_ARTIST_SUCCESS:
            return {...state, loading: false};
        case PUBLISH_ARTIST_FAILURE:
            return {...state, loading: false, error: action.payload};

        default:
            return state;
    }
};

export default artistsReducer;