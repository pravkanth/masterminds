import {useSelector} from "react-redux"
import { useEffect,useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Product from "./Product";
import { getAllProducts } from "../../features/products/productsSlice";
const HomePage = () => {
  const [category,setCategory] = useState("")
  const [price,setPrice] = useState(0)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user,isError,isSuccess,isPending,message} = useSelector((state)=>state.auth)
  const {products} = useSelector((state)=> state.products)
  useEffect(()=>{
    if (isError) {
      console.log(message)
    }
    if(!user){
      navigate("/login")
    }else{
      dispatch(getAllProducts())
    }
  },[user,isError,dispatch,navigate,message,isSuccess,isPending])
  

  let finalProduct= products

  function filterProducts(){
    if(category.length>0){
        finalProduct = products.filter((item)=>{
        if(item.category===category){
          return item
        }
      })
    }
  }
  filterProducts()
  return (
    <div className="homepage">
      <div className="homepage-search">
          <div className="filter-search">
            <label>
                Pick a category:
                <select name="selectedFruit" defaultValue="All Products" onChange={(e)=>setCategory(e.target.value)}>
                  <option value="">All Products</option>
                  <option value="electronics">electronics</option>
                  <option value="men's clothing">men's clothing</option>
                  <option value="women's clothing">women's clothing</option>
                  <option value="jewelery">jewelery</option>
                </select>
            </label>
          </div>
          <div className="name-search">
            <input type="number" className="input-price" placeholder="Sort by Price" onChange={(e)=>setPrice(e.target.value)}/>
          </div>
      </div>
      <div className="products">
        {
            finalProduct.filter((item)=>{
              if(price===0 || price === ""){
                return item
              }else if(parseInt(item.price)<parseInt(price)){
                return item
              }
            })
            .map((item)=>(
              <Product key={item._id} item={item}/>
            ))
        }
      </div>
    </div>
  )
}

export default HomePage

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array
// }
// let productsArr = shuffleArray(products)