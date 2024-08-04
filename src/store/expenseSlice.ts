import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./index";
import { Category } from "./categorySlice";

export interface Expense {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: Category;
}

export interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
};

interface ExpensePayload {
  expense: Expense;
}

interface ErrorResponse {
  message: string;
}

// Fetch Expenses
export const fetchExpenses = createAsyncThunk<
  Expense[],
  void,
  {
    rejectValue: ErrorResponse;
    state: RootState;
  }
>("expense/fetchExpenses", async (_, {rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.get(
      "https://expense.ethioace.com/api/expense",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.data;
  } catch (error: any) {
    let errorMessage = "An error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message;
    }
    return rejectWithValue({ message: errorMessage });
  }
});

// Add Expense
export const addExpense = createAsyncThunk<
  ExpensePayload,
  { amount: number; date: string; description: string; category: Category },
  {
    rejectValue: ErrorResponse;
    state: RootState;
  }
>("expense/addExpense", async (expenseData, {rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.post(
      "https://expense.ethioace.com/api/expense",
      {
        amount: expenseData.amount,
        date: expenseData.date,
        description: expenseData.description,
        category_id: expenseData.category.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    return { expense: data.data };
  } catch (error: any) {
    let errorMessage = "An error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message;
    }
    return rejectWithValue({ message: errorMessage });
  }
});

// Update Expense
export const updateExpense = createAsyncThunk<
  ExpensePayload,
  {
    id: string;
    amount: number;
    date: string;
    description: string;
    category: Category;
  },
  {
    rejectValue: ErrorResponse;
    state: RootState;
  }
>(
  "expense/updateExpense",
  async (expenseData, {rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.put(
        `https://expense.ethioace.com/api/expense/${expenseData.id}`,
        expenseData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { expense: data.data };
    } catch (error: any) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Delete Expense
export const deleteExpense = createAsyncThunk<
  string,
  { id: string },
  {
    rejectValue: ErrorResponse;
    state: RootState;
  }
>("expense/deleteExpense", async ({ id }, {rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`https://expense.ethioace.com/api/expense/${id}`, {
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

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchExpenses.fulfilled,
        (state, action: PayloadAction<Expense[]>) => {
          state.loading = false;
          state.expenses = action.payload;
        }
      )
      .addCase(
        fetchExpenses.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to fetch expenses";
        }
      )
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addExpense.fulfilled,
        (state, action: PayloadAction<ExpensePayload>) => {
          state.loading = false;
          state.expenses.push(action.payload.expense);
        }
      )
      .addCase(
        addExpense.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to add expense";
        }
      )
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateExpense.fulfilled,
        (state, action: PayloadAction<ExpensePayload>) => {
          state.loading = false;
          const index = state.expenses.findIndex(
            (expense) => expense.id === action.payload.expense.id
          );
          if (index !== -1) {
            state.expenses[index] = action.payload.expense;
          }
        }
      )
      .addCase(
        updateExpense.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to update expense";
        }
      )
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteExpense.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.expenses = state.expenses.filter(
            (expense) => expense.id !== action.payload
          );
        }
      )
      .addCase(
        deleteExpense.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to delete expense";
        }
      );
  },
});

export default expenseSlice.reducer;
