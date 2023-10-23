import { Link,NavLink } from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faXmark, faCartShopping, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./home.css"
function HomePage(props){
    //navbar icon code
    let [iconValue,handleIcon]=useState({
        initialValue:faBars
    })
    // Data load up
    let data;
    if(props.data===null){
        return
    }
    else{
        data=props.data;
    }
  
  let handleClick=()=>{
    let navBox=document.querySelector(".navigation nav")
    navBox.classList.toggle("visible")
    handleIcon(()=>{
      if(iconValue.initialValue===faBars){
        return{
          initialValue:faXmark
        }
      }else{
        return{
          initialValue:faBars
        }
      }
    })
  }
    //cart data tracker
    let cartNumber=0;
    let cartItemsPresent=localStorage.getItem("cart-filled");
    console.log(cartItemsPresent)
    if(cartItemsPresent){
      let cartProductData=JSON.parse(localStorage.getItem("cart-products"))
      console.log(cartProductData)
      if(cartProductData.length>0){
        for(let i=0;i<cartProductData.length;i++){
          cartNumber+=parseInt(cartProductData[i].quantity)
        }
      }
      else{
          cartNumber=0;
      }
    }
    return(
        <div className="main-container">
            <div className="navigation">
                <h1>Store-it</h1>
                <FontAwesomeIcon icon={iconValue.initialValue} onClick={handleClick} className="hamburger-icon"/>
                <nav>
                <NavLink className="navLinks" to="/">Home</NavLink>
                <NavLink className="navLinks" to="/about">About</NavLink>
                <NavLink className="navLinks" to="/cart">Cart({cartNumber})</NavLink>
                <NavLink className="navLinks drop" onClick={()=>{
                        localStorage.removeItem("isLoggedIn");
                        window.location.reload();
                  }}>Logout</NavLink>
                </nav>
            </div>
            <div className="banner-cover">
              <div className="banner">
                <h1>Store-It,</h1>
                <h3>Your online store!</h3>
              </div>
              <div className="banner-icon">
                <FontAwesomeIcon className="icon" icon={faShoppingCart}></FontAwesomeIcon>
              </div>
            </div>
            <div className="card-container">
                {data.map(elements=>(
                    <div className="cards">
                        <img src={elements.productImage} alt="images"></img>
                        <div className="cards-header">
                            <h2><Link className="card-link" to={`/products/${elements.productName}`}>{elements.productName}</Link></h2>
                            <p>${elements.productPrice}</p>
                        </div>
                        <p className="cards-category">Category: {elements.productCat}</p>
                        <button className="cards-button"><Link className="link" to={`/products/${elements.productName}`}>View</Link></button>
                    </div>
                ))} 
            </div>
        </div>
    )
}

export default HomePage