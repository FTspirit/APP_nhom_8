import { createStore ,applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer'
import rootSaga from './saga/rootSaga'
import { create } from "react-test-renderer";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default {
    store,
}