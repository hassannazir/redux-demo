const redux = require('redux')
const axios = require('axios')
const createStore = redux.createStore
const thunkMiddleware = require('redux-thunk').default
const applyMiddleware = redux.applyMiddleware

//ACTION CONSTANTS
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

//INITIAL STATE
const initialState = {
    loading: false,
    users: [],
    error: ''
}

//ACTION CREATERS
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersError = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

//REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }

}


const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
            const users = res.data.map(user => user.id)
            dispatch(fetchUsersSuccess(users))
        }).catch(err => {
            dispatch(fetchUsersError(err.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

console.log('Initial State: ', store.getState())
const unsubscribe = store.subscribe(() => console.log('Updated State: ', store.getState()))
store.dispatch(fetchUsers())


