export const SET_FETCHING = 'SET_FETCHING';

export function setFetching(flag) {
    return {
        type: SET_FETCHING,
        payload: flag
    };
}
