import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./index";
import Dashboard from "../MainComponents/Dashboard";

interface Dashboard {
    expense : []
    income : []
    category : []
}

export interface DashboardExpense{
    month: string;
    amount: number;
}

export interface DashboardIncome{
    month: string;
    amount: number;
}

export interface DashboardCategory{
    category: string;
    amount: number;
}

interface DashboardState {
    expense: DashboardExpense[];
    income: DashboardIncome[];
    category: DashboardCategory[];
    loading: boolean;
    error: string | null;
}

const initialState = {
    expense : [],
    income : [],
    category : [],
    loading : false,
    error : ""
};


interface ErrorResponse {
    message: string;
}

export const fetchDashboard = createAsyncThunk<
Dashboard,
    void,
    { rejectValue: ErrorResponse, state:RootState }

> (
    "dashboard/fetchDashboard",
    async (_, { rejectWithValue,getState }) => {
        const token = localStorage.getItem('token');        try {
            const { data } = await axios.get("https://expense.ethioace.com/api/dashboard", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            return data;
        } catch (error: any) {
            let errorMessage = 'An error occurred';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message;
            }
            return rejectWithValue({ message: errorMessage });
        }
    }
)


const dashboardSlice = createSlice(
{
    name : "dashboard",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchDashboard.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDashboard.fulfilled, (state, action) => {
            state.loading = false;
            state.expense = action.payload.expense;
            state.income = action.payload.income;
            state.category = action.payload.category;
        });
        builder.addCase(fetchDashboard.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || 'Failed to fetch dashboard';
        });
    }
}
);

export default dashboardSlice.reducer;