import Request from '../../Config/request'
import History from '../../Config/history'
import { FolderHelpers } from './folderActions'
import { getCurrentUser } from '../Users-Managment/user'

export const getFolder = (folderID) => {
    return (dispatch) => {
        return Request.get(`folder/${folderID}/`)
            .then(data => dispatch(FolderHelpers.getFolder(data.id)))
    }
}