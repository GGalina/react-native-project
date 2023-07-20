import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './Users/userSlice';
import postReducer from './Posts/postSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    },
    middleware: [thunk],
});
//store.subscribe(() => console.log('State updated:', store.getState()));
export default store;
