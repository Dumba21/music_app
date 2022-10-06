import {
    DELETE_TRACK_FAILURE,
    DELETE_TRACK_REQUEST, DELETE_TRACK_SUCCESS,
    FETCH_TRACKS_FAILURE,
    FETCH_TRACKS_REQUEST,
    FETCH_TRACKS_SUCCESS, POST_TRACKS_FAILURE,
    POST_TRACKS_REQUEST, POST_TRACKS_SUCCESS
} from "../actions/tracksActions";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_TRACKS_SUCCESS:
            return {...state, loading: false, data: action.payload};
        case FETCH_TRACKS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case POST_TRACKS_REQUEST:
            return {...state, loading: true, error: null};
        case POST_TRACKS_SUCCESS:
            return {...state, loading: false};
        case POST_TRACKS_FAILURE:
            return {...state, loading: false, error: action.payload};

        case DELETE_TRACK_REQUEST:
            return {...state, loading: true, error: null};
        case DELETE_TRACK_SUCCESS:
            return {...state, loading: false};
        case DELETE_TRACK_FAILURE:
            return {...state, loading: false, error: action.payload};
            
        default:
            return state;
    }
};

export default tracksReducer;