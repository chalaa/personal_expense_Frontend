import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import categoryReducer from './categorySlice';
import expenseReducer from './expenseSlice'
import incomeReducer from './incomeSlice'
import dashboardReducer from './dashboardSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    expense: expenseReducer,
    income: incomeReducer,
    dashboard : dashboardReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
