import {Link,useNavigate} from 'react-router-dom'
import {useState} from "react"
import axios from 'axios';
import "./login.css"
function LoginPage(props){

    let Navigate=useNavigate();
    let [formValues,handleForm]=useState({
        email:"",
        password:""
    })

    let handleChange = (event) =>{
        let {name,value}=event.target;
        handleForm({
            ...formValues,
            [name]:value
        })
    }

    let login = () =>{
        axios.post("https://node-e-commerce.onrender.com/signin",formValues)
        .then(res=>{
            if(res.data.message==="Wrong Credentials!"){
                alert(res.data.message)
            }
            else{
                Navigate("/")
                window.localStorage.setItem("isLoggedIn",true)
            }
            window.location.reload();
        })
        .catch(err=>{console.log(err)})
    }

    return(
        <div className="login">
            <h1 className="main-logo">Store-it</h1>
            <h1>Log-in</h1>
            <div className="login-page">
                <label>Enter your e-mail:</label><input value={formValues.email} name="email" onChange={handleChange} type="email" placeholder="Your email"></input>
                <label>Enter your password:</label><input value={formValues.password} name="password" onChange={handleChange} type="password" placeholder="Your password"></input>
                <button onClick={login}>Log-In</button>
            </div>
            <p>Haven't registered? <Link to="/register">Register</Link></p>
        </div>
    )
}

export default LoginPage