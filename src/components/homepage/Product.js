import React from 'react'
import {useDispatch} from "react-redux"
import {BsStarFill} from "react-icons/bs"
import {FaStarHalfAlt} from "react-icons/fa"
import { nanoid } from 'nanoid'
import { toast  } from 'react-toastify'

import './homepage.css'
import { addToCart } from '../../features/cart/cartSlice'
const Product = ({item}) => {
    const dispatch = useDispatch()
    let prodRating = item.rating
    let decimal = Math.trunc(prodRating);
    let halfStar = false
    if(decimal !== prodRating){
      halfStar = true
    }
    let productRating = []
    for(let i=0;i<decimal;i++){
        productRating.push('')
    }

    const addToCartBtn = ()=>{
        dispatch(addToCart(item._id))
        toast.success("Moved To cart", {
            position: toast.POSITION.TOP_CENTER
          });
    }
  return (
    <div className="product">
        <p className='product-name'>{item.title}</p>
        <p className='product-rating'>
            {
                productRating.map(() =>{
                    return <BsStarFill key={nanoid()}/>
                })
            }
            {
                halfStar===true?<FaStarHalfAlt key={nanoid()}/>:<></>       
            }
        </p>
        <p className='product-price'>
        <small>₹</small>
        <strong>{item.price}</strong>
        </p>
        <div className='product-img-btn'>
            <img src={item.image} alt="img"/>
            <button className="cart-btn" onClick={addToCartBtn}>Add to cart</button>
        </div>
  </div>
  )
}

export default Product