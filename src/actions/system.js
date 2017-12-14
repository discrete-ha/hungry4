export const SET_FETCHING = 'SET_FETCHING';
export const SET_LOADING_MESSAGE = 'SET_LOADING_MESSAGE';

export function setFetching(flag) {
    return {
        type: SET_FETCHING,
        payload: flag
    };
}

export function setLoadingMessage(text) {
    return {
        type: SET_LOADING_MESSAGE,
        payload: text
    };
}