import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user';
import musicReducer from './modules/music';

const store = configureStore({
  reducer: {
    user: userReducer,
    music: musicReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
