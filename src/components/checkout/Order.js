import { BsStarFill } from "react-icons/bs";
import { FaStarHalfAlt } from "react-icons/fa";
import { nanoid } from "nanoid";
import "./checkout.css";

const Order = ({ item,qty }) => {
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
                <p className="quantity">Qty: {qty}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
