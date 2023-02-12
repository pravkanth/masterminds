import axios from 'axios'

const API_URL = 'http://localhost:5000/api/products/orders'

const getOrders  = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL,config)
  console.log(response.data);
  return response.data
}


const orderProducts  = async (data,token) => {
  console.log(data);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL,data,config)
  console.log(response.data);
  return response.data
}

const ordersService = {
  getOrders,
  orderProducts,
}

export default ordersService
