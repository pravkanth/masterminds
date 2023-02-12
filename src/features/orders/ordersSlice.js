import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ordersService from './ordersService'


const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// orderProducts
export const getOrders = createAsyncThunk('orders/getOrders', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ordersService.getOrders(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// orderProducts
export const orderProducts = createAsyncThunk('orders/orderProducts', async (orders, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ordersService.orderProducts(orders,token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})



export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.products = []
      })
      .addCase(orderProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(orderProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(orderProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.products = []
      })
  },
})

export const { reset } = ordersSlice.actions
export default ordersSlice.reducer
