const redux = require('redux')
const logger = require('redux-logger').createLogger()
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

//action type constants
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

//action creaters
const buyCake = () => {
    return {
        type: BUY_CAKE,
        info: 'First Redux Action'
    }
}

const buyIcecream = () => {
    return {
        type: BUY_ICECREAM,
    }
}

//initial State
const initialCakeState = {
    numOfCakes: 10
}

const initialIcecreamState = {
    numOfIcecreams: 20
}


//reducer
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }

        default:
            return state;
    }
}

const icecreamReducer = (state = initialIcecreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
            return {
                ...state,
                numOfIcecreams: state.numOfIcecreams - 1
            }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))

console.log('Initial State: ', store.getState())
const unsubscribe = store.subscribe(() => console.log('Updated State: ', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()

//output
// Initial State:  { cake: { numOfCakes: 10 }, icecream: { numOfIcecreams: 20 } }
// Updated State:  { cake: { numOfCakes: 9 }, icecream: { numOfIcecreams: 20 } }
// Updated State:  { cake: { numOfCakes: 8 }, icecream: { numOfIcecreams: 20 } }
// Updated State:  { cake: { numOfCakes: 7 }, icecream: { numOfIcecreams: 20 } }
// Updated State:  { cake: { numOfCakes: 7 }, icecream: { numOfIcecreams: 19 } }
// Updated State:  { cake: { numOfCakes: 7 }, icecream: { numOfIcecreams: 18 } }