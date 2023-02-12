import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService'


const initialState = {
  cartProductsId: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


export const addToCart = createAsyncThunk('cart/addToCart', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await cartService.addToCart(id,token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getCartItem = createAsyncThunk('cart/getCartItem', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await cartService.getCartItem(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateCartQty = createAsyncThunk('cart/updateCartQty', async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await cartService.updateCartQty(data,token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await cartService.deleteCartItem(id,token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const emptyCart = createAsyncThunk('cart/emptyCart', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await cartService.emptyCart(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartProductsId = action.payload
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.cartProductsId = []
      })
      .addCase(getCartItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartProductsId = action.payload
      })
      .addCase(getCartItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.cartProductsId = []
      })
      .addCase(updateCartQty.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCartQty.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartProductsId = action.payload
      })
      .addCase(updateCartQty.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.cartProductsId = []
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartProductsId = action.payload
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.cartProductsId = []
      })
      .addCase(emptyCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.cartProductsId = action.payload
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.cartProductsId = []
      })
  },
})

export const { reset } = cartSlice.actions
export default cartSlice.reducer
