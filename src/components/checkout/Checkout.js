import Cart from './Cart'
import { useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { getAllProducts } from '../../features/products/productsSlice'
import { toast  } from 'react-toastify'
import './checkout.css'

import { orderProducts } from '../../features/orders/ordersSlice'
import { emptyCart} from '../../features/cart/cartSlice'

const Checkout = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state)=>state.auth)
    const {products} = useSelector((state)=> state.products)
    const {cartProductsId,isError,isSuccess,isPending,message} = useSelector(state => state.cart)
    let cartProductsIdentity = cartProductsId?cartProductsId.items:[]

    let totalItem = 0,totalAmount = 0;
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
      
    let cartProducts = []
    cartProductsIdentity && (
        cartProductsIdentity.forEach((prod)=>{
            products.forEach((item) => {
                if(item._id === prod.productId){
                    totalItem += prod.qty
                    totalAmount += (prod.qty*item.price)
                    cartProducts.push(item)
                    return
                }
            })
        })
    )
    const proceedOrder = ()=>{
        dispatch(orderProducts(cartProductsIdentity))
        dispatch(emptyCart())
        toast.success("Order Placed", {
            position: toast.POSITION.TOP_CENTER
          });
        navigate("/")
    }
    return(
        <div className="checkout-page">
            {
                cartProducts?.length===0?
                    <div className="cart-empty-div">
                        <div className="cart-empty-left">
                            <h2>Cart is empty.</h2>
                        </div>
                    </div>:
                    <div className="cart-product-div">
                        <div className="cart-product-left">
                            <h2>Shopping Cart</h2>
                            <div className="cart-product">
                                {
                                    cartProducts?.map((item,id)=>{
                                        return <Cart
                                            key={item._id}
                                            item = {item}
                                            qty = {cartProductsIdentity[id].qty}                                             
                                        />
                                    })
                                }  
                            </div>
                        </div>
                        <div className="cart-product-right">
                                <h4>Subtotal({totalItem} item):<small>₹</small>{totalAmount}</h4>
                                <button className='proceed-to-buy' onClick={proceedOrder}>Proceed to buy</button>
                        </div>
                    </div>
            }
        </div>
     
    )
}

export default Checkout