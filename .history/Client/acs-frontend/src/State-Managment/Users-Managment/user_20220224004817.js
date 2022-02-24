import Request from '../../Config/request';
import { USER_HELPERS } from './user.actions'

export const getCurrentUser = () => {
    return async (dispatch) => {
        try {
            const data = await Request.get('users/1/');
            return dispatch(USER_HELPERS.getUserSuccess(data.id, data.name, data.land));
        } catch (err) {
            return dispatch(USER_HELPERS.getUserFail(err.message));
        }
    }
}