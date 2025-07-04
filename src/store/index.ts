import { configureStore } from '@reduxjs/toolkit';
import testReducer from './modules/test';

const store = configureStore({
  reducer: {
    test: testReducer
  }
});

export default store;
