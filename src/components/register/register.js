import {Link, useNavigate} from 'react-router-dom'
import {useState} from "react"
import "../register/register.css"
import axios from 'axios'
function RegisterPage(){

    let navigate=useNavigate();
    let [formValues,handleForm]=useState({
        name:"",
        email:"",
        password:"",
        repassword:""
    })

    let handleChange = (event) =>{
        let {name,value}=event.target;
        handleForm({
            ...formValues,
            [name]:value
        })
    }

    const register=()=>{
        let {name,email,password,repassword}=formValues
        if(name && email && password && (password===repassword)){
            axios.post("https://node-e-commerce.onrender.com/register",formValues)
            .then(res=>{
                alert(res.data.message);
                navigate("/signin")
                window.location.reload();
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            alert("Invalid credentials")
        }
    }

    return(
        <div className="register">
            <h1 className="main-logo">Store-it</h1>
            <h1>Register</h1>
            <div className="register-page">
                <label>Enter your name:</label><input name="name" onChange={handleChange} value={formValues.name} type="text" placeholder="Your username"></input>
                <label>Enter your e-mail:</label><input value={formValues.email} name="email" onChange={handleChange} type="email" placeholder="Your email"></input>
                <label>Enter your password:</label><input value={formValues.password} name="password" onChange={handleChange} type="password" placeholder="Your password"></input>
                <label>Re-enter your password:</label><input value={formValues.repassword} name="repassword" onChange={handleChange} type="password" placeholder="Re-enter password"></input>
                <button onClick={register}>Register</button>
            </div>
            <p>Head over to the sign-in page now <Link to="/signin">Sign-In</Link></p>
        </div>
    )
}

export default RegisterPage