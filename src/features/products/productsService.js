import axios from 'axios'

const API_URL = 'http://localhost:5000/api/products/'


const getAllProducts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

const authService = {
  getAllProducts,
}

export default authService
