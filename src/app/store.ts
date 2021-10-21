import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import catReducer from '../features/cat/catSlice'
import createSagaMiddleware from 'redux-saga'
import catSaga from '../features/cat/cat.saga'

export const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

export const store = configureStore({
    reducer: {
        cat: catReducer,
    },
    middleware,
})

sagaMiddleware.run(catSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
