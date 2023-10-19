
import { BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import HomePage from './components/home.js';
import LoginPage from './components/login/login';
import RegisterPage from './components/register/register';
import AboutPage from './components/about/about';
import CartPage from './components/cart/cart';
import ProductPage from './components/products/products.js';
import CheckoutSuccess from './components/checkout-success/checkout-success.js';
import "./app.css";
import axios from 'axios';
function App() {


  //redux state management
  let state=useSelector((state)=>{
    return{
      ...state
    }
  })
  let dispatch=useDispatch()

  useEffect(()=>{ 
    axios.get("https://node-e-commerce.onrender.com/")
    .then(res=>{
      dispatch({
        type:"LOADDATA",
        payload:res.data.allData
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
    //cart data tracker
    let cartElements=0;
    let cartNumber=0;
    // let cartSize=state.cartData.length;
    // console.log(cartSize)
    // let cartLocalStorage=localStorage.setItem("cart-size",JSON.stringify(cartSize))
    let cartItemsPresent=localStorage.getItem("cart-filled");
    console.log(cartItemsPresent)
    if(cartItemsPresent>0){
      let cartProductData=JSON.parse(localStorage.getItem("cart-products"))
      console.log(cartProductData)
      if(cartProductData.length>0){
        for(let i=0;i<cartProductData.length;i++){
          cartElements+=cartProductData[i].rate
          cartNumber+=parseInt(cartProductData[i].quantity)
        }
      }
      else{
          cartNumber=0;
      }
    }
  
    // localStorage.clear();
    let isLoggedIn=window.localStorage.getItem("isLoggedIn")
  return (
    <div className="App">
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={isLoggedIn? <HomePage data={state.homeData}/> : <LoginPage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/cart" element={<CartPage data={state.homeData} totalPrice={cartElements}/>}></Route>
          <Route path="/signin" element={<LoginPage/>}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/success" element={<CheckoutSuccess />}></Route>
          <Route path="/products/:id" element={<ProductPage data={state.homeData}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;