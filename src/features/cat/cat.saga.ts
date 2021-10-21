import { call, put, takeEvery, all } from 'redux-saga/effects'
import { fetchCatError, fetchCatRequest, fetchCatSuccess } from './catSlice'
import { fetchCatRequestAPI } from './catAPI'

function* fetchCatWorker(): any {
    try {
        const cat = yield call(fetchCatRequestAPI)
        yield put(fetchCatSuccess(cat))
    } catch (error) {
        yield put(fetchCatError())
    }
}

function* fetchCatWatcher() {
    yield takeEvery(fetchCatRequest().type, fetchCatWorker)
}

export default function* catSaga() {
    yield all([fetchCatWatcher()])
}
