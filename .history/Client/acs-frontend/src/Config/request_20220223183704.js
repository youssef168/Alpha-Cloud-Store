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
const fetchData = (path, arg) => {
    return fetch(BACKEND_URL + path, arg).then(res => {
        return res.json()
    })
}

//TODO: create a Function to Make Query String For Request and Search Option Sepecially
const makeQueryString = (query) => {
    let qString = Object.keys(query).reduce((acc, key) => {
        acc = acc + key + '=' + query[key] + '&';
        return acc;
    }, '');
    return qString;
}

export default class Request {
    static get(path, query = {}) {
        if (path[path.length - 1] !== '/') {
            path += '/'
        }

        let args = merge({}, createDefaultRequest(), { method: 'GET' });

        let qString = makeQueryString(query);

        if (qString.endsWith('&')) {
            qString = qString.substring(0, qString.length - 1)
        }

        if (qString !== '') {
            path = path + '?' + qString
        }

        return fetchData(path, args)
    }

    static postFormData(path, data) {
        if (path[path.length - 1] !== '/') {
            path += '/'
        }

        let args = cloneDeep(createDefaultRequest());
        args.method = 'POST';
        
        delete args.headers['Content-Type']

    }

}