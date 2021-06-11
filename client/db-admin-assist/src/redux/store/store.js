// import { createStore, applyMiddleware} from 'redux';

// import thunk from 'redux-thunk';
import { createStore} from 'redux';
import authreducer from '../reducer/authreducer';

// const initialState = {};

// const middleware = [thunk];



const store = createStore(
   authreducer,
//    initialState,
//    applyMiddleware(...middleware
    // ),

   // compose(
   //    applyMiddleware(...middleware),
   //    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   // )
);

export default store;