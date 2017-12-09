export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const SET_PLACE_LIST = 'SET_PLACE_LIST';
export const SET_DETAIL_PLACE = 'SET_DETAIL_PLACE';
export const SET_SHOWING_PLACE = 'SET_SHOWING_PLACE';
export const SET_RANDOM_LIST = 'SET_RANDOM_LIST';
export const SET_RANDOM_PLACE = 'SET_RANDOM_PLACE';
export const SET_IMAGE_GALLERY = 'SET_IMAGE_GALLERY';

export function setSearchText(text) {
    return {
        type: SET_SEARCH_TEXT,
        payload: text
    };
}

export function setPlaceList(data) {
    return {
        type: SET_PLACE_LIST,
        payload: data
    };
}

export function setDetailPlace(data) {
    return {
        type: SET_DETAIL_PLACE,
        payload: data
    };
}

export function setShowingPlace(data) {
    return {
        type: SET_SHOWING_PLACE,
        payload: data
    };
}

export function setRandomList(data) {
    return {
        type: SET_RANDOM_LIST,
        payload: data
    };
}

export function setRandomPlace(data) {
    return {
        type: SET_RANDOM_PLACE,
        payload: data
    };
}

export function setImageGallery(data) {
    return {
        type: SET_IMAGE_GALLERY,
        payload: data
    };
}
