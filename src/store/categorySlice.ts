import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./index";
export interface Category {
  id: string;
  name: string;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: null | string;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

interface CategoryPayload {
  category: { id: string; name: string };
}

interface ErrorResponse {
  message: string;
}

// Fetch categories
export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: ErrorResponse; state: RootState }
>("category/fetchCategories", async (_, { getState, rejectWithValue }) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.get(
      "https://expense.ethioace.com/api/category",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    let errorMessage = "An error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message;
    }
    return rejectWithValue({ message: errorMessage });
  }
});

// Add category
export const addCategory = createAsyncThunk<
  CategoryPayload,
  { name: string },
  { rejectValue: ErrorResponse }
>(
  "category/addCategory",
  async (categoryData: { name: string }, { getState, rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        "https://expense.ethioace.com/api/category",
        categoryData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Update category
export const updateCategory = createAsyncThunk<
  CategoryPayload,
  { id: string; name: string },
  { rejectValue: ErrorResponse; state: RootState }
>(
  "category/updateCategory",
  async (
    categoryData: { id: string; name: string },
    { rejectWithValue, getState }
  ) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.put(
        `https://expense.ethioace.com/api/category/${categoryData.id}`,
        categoryData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error: any) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message;
      }
      return rejectWithValue({ message: errorMessage });
    }
  }
);

// Delete category
export const deleteCategory = createAsyncThunk<
  string,
  { id: string },
  { rejectValue: ErrorResponse; state: RootState }
>("category/deleteCategory", async ({ id }, { rejectWithValue, getState }) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`https://expense.ethioace.com/api/category/${id}`, {
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(
        fetchCategories.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to fetch categories";
        }
      );

    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<CategoryPayload>) => {
          state.loading = false;
          state.categories.push(action.payload.category);
        }
      )
      .addCase(
        addCategory.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to add category";
        }
      );

    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<CategoryPayload>) => {
          state.loading = false;
          const index = state.categories.findIndex(
            (category) => category.id === action.payload.category.id
          );
          if (index !== -1) {
            state.categories[index] = action.payload.category;
          }
        }
      )
      .addCase(
        updateCategory.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to update category";
        }
      );

    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.categories = state.categories.filter(
            (category) => category.id !== action.payload
          );
        }
      )
      .addCase(
        deleteCategory.rejected,
        (state, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to delete category";
        }
      );
  },
});

export default categorySlice.reducer;
