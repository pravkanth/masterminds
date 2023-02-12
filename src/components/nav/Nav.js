import React from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai';
import { useState,useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { useNavigate,Link } from 'react-router-dom'
import { logout, reset } from '../../features/auth/authSlice'
import './nav.css'
import { getCartItem } from '../../features/cart/cartSlice';

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user'))
    const users = useSelector((state)=>state.auth)
    const {cartProductsId,isError,isSuccess,isPending,message} = useSelector(state => state.cart)
    let cartProductsIdentity = cartProductsId?cartProductsId.items:[]
    let cartLength = cartProductsIdentity?cartProductsIdentity.length:0

    const [signedIn,setSignedIn] = useState(user?true:false)

   const handleSignout = ()=>{
    dispatch(logout())
    dispatch(reset())
    setSignedIn(false)
    navigate('/login')
  }
  useEffect(()=>{
    if(signedIn || users.user){
        setSignedIn(true)
        dispatch(getCartItem())
    }else{
        setSignedIn(false)
    }
  },[signedIn,users,isError,isPending,isSuccess,message,dispatch])
  let profileImage = users.user?users.user.profileImg:"" 
  return (
    <div className='nav'>
       <div className='nav-brand'>
            <Link to='/'>
                <img src="https://www.pngitem.com/pimgs/m/178-1783066_shop-now-orange-png-png-download-shop-now.png" alt="logo" />
            </Link>
       </div>
        {
            signedIn? 
                <div className='nav-items'>
                    <img src={profileImage} alt="user" />
                    <p>{users.user.userName}</p>
                    <Link to='/login'>
                        <button className='signout-btn' onClick={handleSignout}>Sign out</button>
                    </Link>
                    <Link to='/orders'>
                        <p className='my-orders'>My orders</p>
                    </Link>
                    <Link to='/checkout'>
                        <div className='nav-cart'>
                            <span className='nav-cart-icon'><AiOutlineShoppingCart/></span>
                            <span className='nav-cart-count'>{cartLength}</span>
                        </div>
                    </Link>
                </div>
                :
                <div className='signout'>
                    <Link to='/login'>
                        <button className='signin-btn'>Sign In</button>
                    </Link>
                </div>

        }
    </div>
  )
}

export default Navbar;