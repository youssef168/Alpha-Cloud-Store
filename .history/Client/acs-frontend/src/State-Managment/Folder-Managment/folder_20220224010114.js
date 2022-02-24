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