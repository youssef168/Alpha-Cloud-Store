import { FolderActions } from "./folderActions";

import cloneDeep from "lodash/cloneDeep";

const cloudStoreState = {
    folderID: null,
    folderView: 'list',
    folderData: {},
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
    let cloneState;

    switch(action.type) {
        case FolderActions.GET_FOLDER_SUCCESS:
            return { ...state, folderID: action.folderID, folderData: action.folder }

        case FolderActions.CREATE_FOLDER_SUCCESS:
            if (action.folderID !== action.parentID) return state

            cloneState = cloneDeep(state)

            cloneState.folderView = 'list';
            cloneState.folderData.folders.push(action.folder)
            return cloneState

        case FolderActions.CREATE_FILE_SUCCESS:
            if (action.folderID !== action.parentID) return state;

            cloneState = cloneDeep(state)
            cloneState.folderView = 'list'
            cloneState.folderData.files.push(action.file)
            return cloneState;

        case FolderActions.SET_VIEW_FOLDER:
            return {...state, folderView: action.folderView}

        case FolderActions.DELETE_FILE_SUCCESS:
        case FolderActions.DELETE_FOLDER_SUCCESS:
            cloneState = cloneDeep(state)
            let fields = action.hasOwnProperty('folderID') ? ['folders', 'folderID'] : ['files', 'fileID']

            cloneState.folderData[fields[0] = cloneState.folderData[fields[0]]].filter(data => data.id !== cloneState.folderData[fields[1]])

            return cloneState;

        case FolderActions.SEARCH_SUCCESS:
            return { ...state, search: { files: action.data.files || [], folders: action.data.folders || [] } }

        case FolderActions.MOVE_FILE_SUCCESS:
        case FolderActions.MOVE_FOLDER_SUCCESS:
            cloneState = cloneDeep(state)
            cloneState.folderData.folders = action.from.folders;
            cloneState.folderData.files = action.from.files;
            return cloneState;

        default:
            return state;
    }
};