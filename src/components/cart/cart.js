import axios from 'axios'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import "./cart.css"
function CartPage(props){
    let state=useSelector(state=>{
        return {...state}
    })

    let cartProductData=JSON.parse(localStorage.getItem("cart-products"))
    let cartItemsPresent=localStorage.getItem("cart-filled");
    let clearCart=()=>{
        localStorage.setItem("cart-products",JSON.stringify([]));
        localStorage.setItem("cart-filled",false)
        window.location.reload()
    }

    let handleCheckout=()=>{
        console.log("Checkout!")
        axios.post("https://node-e-commerce.onrender.com/create-checkout-session",cartProductData)
        .then(res=>{
            if(res.data.url){
                localStorage.setItem("cart-products",JSON.stringify([]));
                localStorage.setItem("cart-filled",false)
                window.location.href=res.data.url
            }
        })
        .catch(err=>{console.log(err)})
    }
    // let removeProduct=(event)=>{
    //     let productElement=event.target.parentElement
    //     console.log(productElement);
    //     productElement.remove();
    // }

    return(
        <div className="main-container">
            <h1 className="main-header">Your Cart</h1>
            {state.cartData.length>0 || cartItemsPresent?
            <div className="products-container-main">
                <div className="product-container">
                    <div className="prods-container">
                        {cartProductData.map(items=>(
                        <div className="cart-products">
                            <h1>Product: {items.header}</h1>
                            <p>Total Price: {items.rate}</p>
                            <p>Quantity: {items.quantity}</p>
                            {/* <button onClick={removeProduct}>Remove</button> */}
                        </div>
                        ))}
                    </div> 
                    <div className="checkout">
                        <p>Grand Total: $ {props.totalPrice}</p>
                        <button className="clear-cart" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
                <button onClick={clearCart} className="clear-cart">Clear Cart</button>
                <Link to="/" className="home-link">Back to homepage</Link>
            </div> 
            : 
            <div className="no-product-header">
                <h3>There's nothing in your cart</h3>
                <Link to="/" className="home-link">Back to homepage</Link>
            </div>
        }
        </div>
    )
}

export default CartPage