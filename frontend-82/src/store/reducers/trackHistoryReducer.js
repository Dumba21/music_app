import {
    FETCH_POST_TRACK_FAILURE,
    FETCH_POST_TRACK_REQUEST,
    FETCH_POST_TRACK_SUCCESS, FETCH_TRACKS_HISTORY_FAILURE, FETCH_TRACKS_HISTORY_REQUEST, FETCH_TRACKS_HISTORY_SUCCESS
} from "../actions/trackHistoryActions";

const initialState = {
    tracksHistory: null,
    loading: false,
    error: null,
};

const trackHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_HISTORY_REQUEST:
            return {...state, loading: true, error: null, tracksHistory: null};
        case FETCH_TRACKS_HISTORY_SUCCESS:
            return {...state, loading: false, error: null, tracksHistory: action.payload};
        case FETCH_TRACKS_HISTORY_FAILURE:
            return {...state, loading: false, error: action.payload, tracksHistory: null};

        case FETCH_POST_TRACK_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_POST_TRACK_SUCCESS:
            return {...state, loading: false, error: null};
        case FETCH_POST_TRACK_FAILURE:
            return {...state, loading: false, error: action.payload};

        default:
            return state;
    }
};

export default trackHistoryReducer;