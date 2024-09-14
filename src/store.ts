import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasksSlice';
import filterReducer from './features/filterSlice'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        filter: filterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;