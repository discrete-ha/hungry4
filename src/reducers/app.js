import { SET_FETCHING } from '../actions/system';
import { SET_SEARCH_TEXT, 
    SET_PLACE_LIST, 
    SET_DETAIL_PLACE, 
    SET_SHOWING_PLACE, 
    SET_RANDOM_LIST, 
    SET_RANDOM_PLACE,
    SET_IMAGE_GALLERY 
} from '../actions/place';


const appInitialState = {
    isFetching: true,
    searchText: '',
    placeList:[],
    randomList:[],
    placeDetail:{},
    randomPlace:null,
    showingPlace:null,
    showImageIndex:null
};

const reducer = (state = appInitialState, action) => {
    switch(action.type) {
        case SET_FETCHING:
            return {...state, isFetching: action.payload};
        case SET_SEARCH_TEXT:
            return {...state, searchText: action.payload};
        case SET_PLACE_LIST:
            return {...state, placeList: action.payload};
        case SET_DETAIL_PLACE:
            return {...state, placeDetail: {...state.placeDetail, [action.payload.id]:action.payload} };
        case SET_SHOWING_PLACE:
            return {...state, showingPlace: action.payload };
        case SET_RANDOM_LIST:
            return {...state, randomList: action.payload};
        case SET_RANDOM_PLACE:
            return {...state, randomPlace: action.payload};
        case SET_IMAGE_GALLERY:
            return {...state, showImageIndex: action.payload};
        default:
            return state;
    }
};

export default reducer;
