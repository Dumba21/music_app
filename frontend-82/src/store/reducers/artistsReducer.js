import {
    FETCH_ARTISTS_FAILURE,
    FETCH_ARTISTS_REQUEST,
    FETCH_ARTISTS_SUCCESS, NEW_ARTIST_FAILURE, NEW_ARTIST_REQUEST, NEW_ARTIST_SUCCESS,
} from "../actions/artistsActions";

const initialState = {
    data: null,
    singleArtist:null,
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

        default:
            return state;
    }
};

export default artistsReducer;