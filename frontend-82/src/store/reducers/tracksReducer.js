import {FETCH_TRACKS_FAILURE, FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS} from "../actions/tracksActions";

const initialState = {
    data:null,
    loading:false,
    error:null,
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_TRACKS_SUCCESS:
            return {...state, loading: false, data: action.payload};
        case FETCH_TRACKS_FAILURE:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default tracksReducer;