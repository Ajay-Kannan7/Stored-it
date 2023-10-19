import {Link} from "react-router-dom"
import "./checkout-success.css"
function CheckoutSuccess(){
    return(
        <div className="main-banner">
            <h1 className="main-header">Checkout Successful!</h1>
            <Link to="/" className="home-link">Back to homepage</Link>
        </div>
    )
}

export default CheckoutSuccess