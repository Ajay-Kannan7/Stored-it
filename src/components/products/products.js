import {useParams,Link} from 'react-router-dom'
import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import "./products.css"
function ProductPage(props){
    
    let [quantity,handleQuantity]=useState({
        number:0
    })

    let {id}=useParams();

    //redux state mnagement
    let state=useSelector(state=>{
        return {...state}
    })
    let dispatch=useDispatch()

    //Fetching data
    let data;
    if(props.data===null){
        return
    }
    else{
        data=props.data;
    }

    let handleChange=(event)=>{
        let num = event.target.value
        handleQuantity({
            number:num
        })
    }

    let handleClick=(event)=>{
        let data=event.target.parentElement;
        let productHeader=data.children[0].textContent
        let price=data.children[2].textContent.split(" ")[2];
        let quantityNumber=quantity.number;
        let header=data.children[0].textContent;
        let pushData=state.homeData
        .filter(items=>items.productName===header)
        .map(elements=>{
            return elements;
        })

        if(quantityNumber===0){
            alert("Quantity can't be zero!")
        }
        else{
            if(state.cartData.includes(pushData[0])){
                alert("Item's already in the cart!")
            }
            else{
                state.cartData.push(pushData[0])
                let productObj={
                    quantity:quantityNumber,
                    header:productHeader,
                    rate:price*quantityNumber
                }
                state.productAdded.push(productObj)
                dispatch({
                    type:"CARTQUANTITY",
                    payload:quantityNumber
                })
                localStorage.setItem("cart-products",JSON.stringify(state.productAdded));
                localStorage.setItem("cart-filled",JSON.stringify(state.cartData.length));
                alert("Item's been added to the cart!")
            }
        }
        //state.cartData.length=0;
        console.log(state.productAdded)
    }

    return(
        <div className="main-container">
            {data.filter(items=>items.productName===id).map(elements=>(
                <div className="products-container">
                    <div className="products-image">
                        <img src={elements.productImage} alt="images"></img>
                    </div>
                    <div className="products-desc">
                        <h1>{elements.productName}</h1>
                        <h3>Description: {elements.productDesc}</h3>
                        <p>Price: $ {elements.productPrice}</p>
                        <span className="quantity">Quantity: <input type="number" value={quantity.number} onChange={handleChange}></input></span>
                        <br></br>
                        <button onClick={handleClick}>Add to cart</button>
                    </div>
                </div>
            ))}
            <Link to="/" className="home-link">Back to homepage</Link>
        </div>
    )
}

export default ProductPage;