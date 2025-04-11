//The LoginPopup component provides a modal for users to log in or sign up for an account on the platform. It handles user input, form submission, and displays appropriate messages based on the result of the action.//
import React, { useContext, useState } from 'react';
import './LoginPopup.css'
import { assets } from '../../toyAssets/assets';
import {toast} from 'react-toastify'
import {StoreContext} from '../../Context/StoreContext.jsx'

const LoginPopup = ({ setShowLogin }) => {
    const { setToken, url, loadCartData } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onLogin = async (e) => {
        e.preventDefault();

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        } else {
            new_url += "/api/user/register";
        }

        try {
            const response = await fetch(new_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                setToken(result.token);
                localStorage.setItem("token", result.token);
                loadCartData({ token: result.token });
                setShowLogin(false);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error("Error during login/register:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
                    {currState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button>{currState === "Login" ? "Login" : "Create account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
