import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getOrders } from '../../features/orders/ordersSlice'
import { getAllProducts } from '../../features/products/productsSlice'
import Order from "./Order"

const Orders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const allProducts = useSelector((state)=> state.products)
  const {user} = useSelector((state)=>state.auth)
  const {products,isError,message} = useSelector(state => state.orders)
  let cartProductsIdentity = products[0]?products[0].items:[]
    let allProduct = allProducts.products
  useEffect(() => {
    if (isError) {
        console.log(message)
      }
      if(!user){
        navigate("/login")
      }else{
        dispatch(getAllProducts())
        dispatch(getOrders())
      }
  }, []);
  let cartProducts = []
    cartProductsIdentity && (
        cartProductsIdentity.forEach((prod)=>{
            allProduct.forEach((item) => {
                if(item._id === prod.productId){
                    cartProducts.push(item)
                    return
                }
            })
        })
    )
  console.log(cartProductsIdentity);
    console.log(cartProducts);
  return (
    <div className="checkout-page">
        {
        cartProducts?.length===0?
            <div className="cart-empty-div">
                <div className="order-div">
                    <h2>Order is empty.</h2>
                </div>
            </div>:
            <div className="cart-product-div order-product-div">
                <div className="cart-product-left">
                    <h2>Your Orders</h2>
                    <div className="cart-product">
                        {
                            cartProducts?.map((item,id)=>{
                                return <Order
                                    key={item._id}
                                    item = {item}
                                    qty = {cartProductsIdentity[id].qty}                                             
                                />
                            })
                        }  
                    </div>
                </div>
            </div>
        }
        </div>

  )
}

export default Orders