import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import { calendarSlice, uiSlice, authSlice } from "./index";

const persistConfig = {
    key: 'auth',        // Clave para identificar los datos guardados
    storage,            // Tipo de almacenamiento (localStorage)
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);


const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

const persistor = persistStore(store);

export { store, persistor };