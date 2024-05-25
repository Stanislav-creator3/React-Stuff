import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { TCreateUser, TCurrentUser, TLoginUser, TState, TUpdateUser } from "./types";

export const createUser = createAsyncThunk<TCurrentUser, TCreateUser>(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/users`, payload);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk<TCurrentUser, TUpdateUser>(
  "users/updateUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${baseUrl}/users/${payload.id}`, payload);
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk<TCurrentUser, TLoginUser>(
  "users/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, payload);
      const login = await axios(`${baseUrl}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });
      return login.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addCurrentUser = (
  state: TState,
  { payload }: { payload: TCurrentUser }
) => {
  state.currentUser = payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    cart: [],
    isLoading: false,
    formType: "signup",
    showForm: false,
  } satisfies TState as TState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);
      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else newCart.push({ ...payload, quantity: 1 });
      state.cart = newCart;
    },
    removeItemCart: (state, { payload }) => {
      state.cart = state.cart.filter(({id}) => id !== payload.id)
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser);
    builder.addCase(updateUser.fulfilled, addCurrentUser);
  },
});

export const { addItemToCart, toggleForm, toggleFormType, removeItemCart } = userSlice.actions;

export default userSlice.reducer;
