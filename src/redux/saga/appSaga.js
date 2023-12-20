import {put , call} from  'redux-saga/effects'

function* updateMode(userName) {
    yield put({ type: 'CHANGE_APP_MODE_OK', payload: userName });
}

export default function* (action) {
    console.log('appsaga',action);
    yield call(updateMode, action.payload.userName);
}