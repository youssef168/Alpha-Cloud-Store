import { USER_ACTIONS } from './user.actions'

const userState = {
    id: null,
    currentUser: null,
    land: null,
}

export default function userReducer(state = userState, action) {
    
    switch (action.type) {
        case USER_ACTIONS.GET_USER_SUCCESS: 
        return {...state, id: action.id, currentUser: action.id, land: action.land}
    }
};