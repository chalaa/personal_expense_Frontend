import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./index";
import { Category } from "./categorySlice";

export interface Income {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: Category;
}

export interface IncomeState {
  incomes: Income[];
  loading: boolean;
  error: string | null;
}

const initialState: IncomeState = {
  incomes: [],
  loading: false,
  error: null,
};

interface IncomePayload {
  income: Income;
}

interface ErrorResponse {
  message: string;
}

// Fetch Incomes
export const fetchIncomes = createAsyncThunk<
  Income[],
  void,
  {
    rejectValue: ErrorResponse;
  }
>("income/fetchIncomes", async (_, {rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.get("http://127.0.0.1:8000/api/income", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error: any) {
    let errorMessage = "An error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message;
    }
    return rejectWithValue({ message: errorMessage });
  }
});

// Add Income
export const addIncome = createAsyncThunk<
  IncomePayload,
  { amount: number; date: string; description: string; category: Category },
  {
    rejectValue: ErrorResponse;
  }
>("income/addIncome", async (incomeData, { rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/income",
      {
        amount: incomeData.amount,
        date: incomeData.date,
        description: incomeData.description,
        category_id: incomeData.category.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { income: data.data };
  } catch (error: any) {
    let errorMessage = "An error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message;
    }
    return rejectWithValue({ message: errorMessage });
  }
});

// Update Income
export const updateIncome = createAsyncThunk<
  IncomePayload,
  {
    id: string;
    amount: number;
    date: string;
    description: string;
    category: Category;
  },
  {
    rejectValue: ErrorResponse;
  }
>("income/updateIncome", async (incomeData, {rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/income/${incomeData.id}`,
      incomeData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { income: data.data };
  } catch (error: any) {
    let errorMessage = "An error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message;
    }
    return rejectWithValue({ message: errorMessage });
  }
});

// Delete Income
export const deleteIncome = createAsyncThunk<
  string,
  { id: string },
  {
    rejectValue: ErrorResponse;
  }
>("income/deleteIncome", async ({ id }, {rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`http://127.0.0.1:8000/api/income/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return id;
  } catch (error: any) {
    let errorMessage = "An error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message;
    }
    return rejectWithValue({ message: errorMessage });
  }
});

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIncomes.fulfilled,
        (state, action: PayloadAction<Income[]>) => {
          state.loading = false;
          state.incomes = action.payload;
        }
      )
      .addCase(
        fetchIncomes.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to fetch incomes";
        }
      )
      .addCase(addIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addIncome.fulfilled,
        (state, action: PayloadAction<IncomePayload>) => {
          state.loading = false;
          state.incomes.push(action.payload.income);
        }
      )
      .addCase(
        addIncome.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to add income";
        }
      )
      .addCase(updateIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateIncome.fulfilled,
        (state, action: PayloadAction<IncomePayload>) => {
          state.loading = false;
          const index = state.incomes.findIndex(
            (income) => income.id === action.payload.income.id
          );
          if (index !== -1) {
            state.incomes[index] = action.payload.income;
          }
        }
      )
      .addCase(
        updateIncome.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to update income";
        }
      )
      .addCase(deleteIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteIncome.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.incomes = state.incomes.filter(
            (income) => income.id !== action.payload
          );
        }
      )
      .addCase(
        deleteIncome.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to delete income";
        }
      );
  },
});

export default incomeSlice.reducer;
