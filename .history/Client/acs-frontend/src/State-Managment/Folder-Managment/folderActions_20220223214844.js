export const FolderActions = {
    //View Folder, Delete Folder, Move Folder, Get Folder, Create Folder, Set FolderID
    SET_VIEW_FOLDER: 'SET_VIEW_FOLDER',

    //Create Folder Actions
    CREATE_FOLDER: 'CREATE_FOLDER',
    CREATE_FOLDER_SUCCESS: 'CREATE_FOLDER_SUCCESS',
    CREATE_FOLDER_FAIL: 'CREATE_FOLDER_FAIL',

    //Create File Actions
    CREATE_FILE: 'CREATE_FILE',
    CREATE_FILE_SUCCESS: 'CREATE_FILE_SUCCESS',
    CREATE_FILE_FAIL: 'CREATE_FILE_FAIL',

    //Delete Folder Actions
    DELETE_FOLDER: 'DELETE_FOLDER',
    DELETE_FOLDER_SUCCESS: 'DELETE_FOLDER_SUCCESS',
    DELETE_FOLDER_FAIL: 'DELETE_FOLDER_FAIL',

    // delete file Actions
    DELETE_FILE: 'DELETE_FILE',
    DELETE_FILE_SUCCESS: 'DELETE_FILE_SUCCESS',
    DELETE_FILE_FAIL: 'DELETE_FILE_FAIL',

    // GET Folder Actions
    GET_FOLDER: 'GET_FOLDER',
    GET_FOLDER_SUCCESS: 'GET_FOLDER_SUCCESS',
    GET_FOLDER_FAIL: 'GET_FOLDER_FAIL',

    // Move Folder Actions
    MOVE_FOLDER: 'MOVE_FOLDER',
    MOVE_FOLDER_SUCCESS: 'MOVE_FOLDER_SUCCESS',
    MOVE_FOLDER_FAIL: 'MOVE_FOLDER_FAIL',

    // Search Folder Actions
    SEARCH : 'SEARCH',
    SEARCH__SUCCESS: 'SEARCH_SUCCESS',
    SEARCH_FAIL: 'SEARCH_FAIL',

    //SET Folder ID For Move Action
    SET_MOVE_FOLDER_ID: 'SET_MOVE_FOLDER_ID',
}

export const FolderHelpers = {

    //* This For Folders Management!
    //get helpers 
    getFolder: (folderID) => ({ type: FolderActions.GET_FOLDER, folderID }),
    getFolderSuccess: (folderID, folder) => ({ type: FolderActions.GET_FOLDER_SUCCESS, folderID, folder }),
    getFolderFail: (folderID, error) => ({ type: FolderActions.GET_FOLDER_FAIL, folderID, error }),

    //  move folder helpers
    moveFolder: (folderID, parentID, id) => ({ type: FolderActions.MOVE_FOLDER, folderID, parentID, id }),
    moveFolderSuccess: (id, from, to, item) => ({ type: FolderActions.MOVE_FOLDER_SUCCESS, id, from, to, item }),
    moveFolderFail: (id, parentID, folderID, error) => ({ type: FolderActions.MOVE_FOLDER_FAIL, id, parentID, folderID, error }),

    //delete folder helpers
    deleteFolder: (folderID, parentID) => ({ type: FolderActions.DELETE_FOLDER, folderID, parentID }),
    deleteFolderSuccess: (folderID, parentID) => ({ type: FolderActions.DELETE_FOLDER_SUCCESS, folderID}),
    deleteFolderFail: (folderID, parentID, error) => ({ type: FolderActions.DELETE_FOLDER_FAIL, folderID, parentID, error }),

    //create folder helpers
    createFolder: (parentID, folderName) => ({ type: FolderActions.CREATE_FOLDER, parentID, folderName }),
    createFolderSuccess: (parentID, folderName, folderID) => ({ type: FolderActions.CREATE_FOLDER_SUCCESS, parentID, folderName, folderID }),
    createFolderFail: (parentID, folderName, error) => ({ type: FolderActions.CREATE_FOLDER_FAIL, parentID, folderName, error }),

    // folder view helper
    setFolderView: (folderView) => ({ type: FolderActions.SET_VIEW_FOLDER, folderView }),

    //* This For Files Management
    createFile: (fileID, parentID, fileName) => ({ type: FolderActions.CREATE_FILE, fileID, parentID, fileName }),
    createFileSuccess: (fileID, parentID) => ({ type: FolderActions.CREATE_FILE_FAIL, fileID, parentID }),
    createFileFail: (fileID, parentID, error) => ({ type: FolderActions.CREATE_FILE_FAIL, fileID, parentID, error }),
}