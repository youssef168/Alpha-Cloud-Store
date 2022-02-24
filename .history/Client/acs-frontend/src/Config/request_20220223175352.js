//TODO: We Need To Call Our Backend URL To Make Requests
import BACKEND_URL from './config'
import cloneDeep from 'lodash/cloneDeep'
import merge from 'lodash/merge'

//TODO: We need to creat a Function To make a default request
const createDefaultRequest = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
};

//TODO: We need to create a Function to fetch my data with my URL and the Path-> URL/path
const fetchData = (path) => {
    return fetch(BACKEND_URL + path).then(res => {
        return res.json()
    })
}