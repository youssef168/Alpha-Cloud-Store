import Request from '../../Config/request'
import History from '../../Config/history'
import { FolderHelpers } from './folderActions'
import { getCurrentUser } from '../Users-Managment/user'

export const getFolder = (folderID) => {
    return async (dispatch) => {
        try {
            const data = await Request.get(`folder/${folderID}/`)
            return dispatch(FolderHelpers.getFolder(data.id, data))
        } catch (err) {
            return dispatch(FolderHelpers.getFolderFail(folderID, err.toString()))
        }
    }
}

export const getUserFolder = () => {
    return async (dispatch) => {
        return dispatch(getCurrentUser())
            .then(action => {
                let path = History.location.pathname || '';
                let splitPath = path.split('/');

                if (splitPath[1] === 'folder') {
                    let id = splitPath[2];
                    return dispatch(getFolder(id))
                }

                else if (action.id) {
                    let folderID = action.home
                    return dispatch(getFolder(folderID))
                }
            })
    }
}

export const fetchFolderRequired = (location) => {
    return async (dispatch, getState) => {
        let state = getState()
        let user = state.user;
        let folderData = state.folder.folderData || {};
        let path = location.pathname || '';

        if (!path.startsWith('/folders') && !path === '/') {
            return null;
        }
        
        let split = path.split('/');
        let folderRouteID = folderData.id;

        if (split[1] === '/folder') {
            let id = split[2];
            folderRouteID = id;

        }

        if (user.id && folderData.id && folderRouteID === folderData.id) {
            return dispatch(getFolder(folderRouteID))
        }
    }
}