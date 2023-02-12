import { BsStarFill } from "react-icons/bs";
import { FaStarHalfAlt } from "react-icons/fa";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import {deleteCartItem, updateCartQty} from '../../features/cart/cartSlice'
import { toast  } from 'react-toastify'

import "./checkout.css";

const CheckoutProduct = ({ item,qty }) => {
  const dispatch = useDispatch()
  let prodRating = item.rating;
  let decimal = Math.trunc(prodRating);
  let halfStar = false;
  if (decimal !== prodRating) {
    halfStar = true;
  }
  let productRating = [];
  for (let i = 0; i < decimal; i++) {
    productRating.push("");
  }

  const addQty = () =>{
    dispatch(updateCartQty({id:item._id,action:"add"}))
    toast.success("item added!!!");
  }

  const deleteQty = () =>{
    if(qty - 1 <=0){
      dispatch(deleteCartItem(item._id))
    }else{
      dispatch(updateCartQty({id:item._id,action:"delete"}))
    }
    toast.warn("item Removed!!!");
  }
  return (
    <div className="cart-product">
      <div className="cart-item">
        <img src={item.image} alt="img" />
        <div className="cart-item-details">
          <p className="product-name">{item.title}</p>
          <p className="product-rating">
            {productRating.map(() => {
              return <BsStarFill key={nanoid()} />;
            })}
            {halfStar === true ? <FaStarHalfAlt key={nanoid()} /> : <></>}
          </p>
          <p className="product-price">
            <small>₹</small>
            <strong>{item.price}</strong>
          </p>
          <div className="cart-btn-div">
            <div className="quantity-div">
                <button onClick={deleteQty}>-</button>
                <p className="quantity">Qty: {qty}</p>
                <button onClick={addQty}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
