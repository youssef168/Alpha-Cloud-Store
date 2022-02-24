import { FolderActions } from "./folderActions";

import cloneDeep from "lodash/cloneDeep";

const cloudStoreState = {
    folderId: null,
    folderView: 'list',
    move: {
        id: null,
        type: '',
    }, 

    search: {
        files: [],
        folders: [],
    }
}

export default function FolderReducer(state = cloudStoreState, action) {
    switch(action.type) {
        case FolderActions.GET_FOLDER_SUCCESS:
            return { ...state, folderID: action.folderID, folder: action.folder }


        default:
            return state;
    }
};