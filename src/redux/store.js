import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./ducks/authSlice";
import productReducer from "./ducks/productSlice";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer
});

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
    sagaMiddleware,
  ],
});

export default store;
