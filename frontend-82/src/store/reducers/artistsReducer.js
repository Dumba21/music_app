import {
    FETCH_ARTISTS_FAILURE,
    FETCH_ARTISTS_REQUEST,
    FETCH_ARTISTS_SUCCESS, FETCH_SINGLE_ARTIST_FAILURE,
    FETCH_SINGLE_ARTIST_REQUEST, FETCH_SINGLE_ARTIST_SUCCESS
} from "../actions/artistsActions";

const initialState = {
    data: null,
    singleArtist:null,
    loading: true,
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
        case FETCH_SINGLE_ARTIST_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_SINGLE_ARTIST_SUCCESS:
            return {...state, loading: false, singleArtist: action.payload};
        case FETCH_SINGLE_ARTIST_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default artistsReducer;