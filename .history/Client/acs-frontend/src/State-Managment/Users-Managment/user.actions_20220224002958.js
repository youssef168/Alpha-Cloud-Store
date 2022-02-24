export const USER_ACTIONS = {
    GET_USER: 'GET_USER',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_FAIL: 'GET_USER_FAIL',
};

export const USER_HELPERS = {
    getUser: () => ({ type: USER_ACTIONS.GET_USER }),
    getUserSuccess: (id, name, land) => ({ type: USER_ACTIONS.GET_USER_SUCCESS, id, name, land }),
    getUserFail: (errorMessage) => ({ type: USER_ACTIONS.GET_USER_FAIL, errorMessage }),
}