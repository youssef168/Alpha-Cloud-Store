import Request from '../../Config/request';
import { USER_HELPERS } from './user.actions'

export const getCurrentUser = () => {
    return (dispatch) => {
        return Request.get('users/1')
            .then(data => dispatch(USER_HELPERS.getUserSuccess(data.id, data.name, data.land)))
            .catch(err => dispatch(USER_HELPERS.getUserFail(err.message)))
    }
}