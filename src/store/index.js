import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../reducers'
import rootSaga from '../sagas'

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware() // --> hàm tạo Saga
    const store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware), // connect the Saga middleware to the store (store bao ngoài)
    )
    sagaMiddleware.run(rootSaga) // chạy hàm Saga và kết nối + làm việc với rootSaga
    return store;
}


export default configureStore;