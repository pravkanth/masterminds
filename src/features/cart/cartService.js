import axios from 'axios'

const API_URL = 'http://localhost:5000/api/products/cart/'
const API_URL2 = 'http://localhost:5000/api/products/'

const addToCart = async (id,token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL+id,config)
  return response.data
}

const getCartItem = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL,config)
  return response.data
}

const updateCartQty  = async (data,token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL2+"qty",data,config)
  return response.data
}

const deleteCartItem = async (id,token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL2+"delete/"+id,config)
  return response.data
}

const emptyCart = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL2+"emptycart",config)
  return response.data
}

const authService = {
  addToCart,
  getCartItem,
  updateCartQty,
  deleteCartItem,
  emptyCart,
}

export default authService
