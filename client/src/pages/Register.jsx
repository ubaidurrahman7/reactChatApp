import React ,{ useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


import { registerRoute } from '../utils/APIRoutes';
import Logo from "../assets/logo.svg"



const Register = () => {
    const navigate = useNavigate();
    const [ values, setValues ] = useState({
        username: "",
        email:"",
        password:"",
        confirmPassword: ""
    });

    const toastOptions  = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(() => {
        if(localStorage.getItem('chat-app-user')){
           navigate('/')
        }
      }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation())  { 
            console.log("in Validation", registerRoute);
            const { password, username, email } = values;
            const { data } = await axios.post( registerRoute, {
                username,
                email,
                password
            });
            if(data.status===false){
                if (data.msg === "Username already used") {
                    toast.error("Username already used. Please choose a different username.", toastOptions);
                } else if (data.msg === "Email already used") {
                    toast.error("Email already used. Please use a different email address.", toastOptions);
                } else {
                    toast.error("An error occurred. Please try again later.", toastOptions);
                };
            }
            if(data.status=== true){
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }
        };

    }
    
    const handleValidation = () =>{
        const { password, confirmPassword, username, email } = values;
        if(email===""){
            toast.error("email is require", toastOptions);
            return false;

        } else if(username.length<4){
            toast.error("Username should be greater than 3 character",
            toastOptions)
        } else if(password!==confirmPassword){
            toast.error("Password and Confirm Password should be same.",
             toastOptions); 
            return false;
        } else if(password.length<3){
            toast.error("Password should be equal or greater than 8 character",
            toastOptions);
        }else{
            return true;
        }
    }
    
    const handleChange =(e) => {
        setValues({...values, [e.target.name]: e.target.value});
        console.log(values);
    }
  return (
    <>
        <FormContainer>
            <form onSubmit={(event =>{handleSubmit(event)})}>
                <div className='brand'>
                    <img src={Logo} alt='logo'/>
                    <h1>snappy</h1>
                </div>
                <input 
                    type='text'
                    placeholder='User name'
                    name='username'
                    onChange={(e) => handleChange(e)}
                />
                <input 
                    type='email'
                    placeholder='Email'
                    name='email'
                    onChange={(e) => handleChange(e)}
                />
                <input 
                    type='password'
                    placeholder='Password'
                    name='password'
                    onChange={(e) => handleChange(e)}
                />
                <input 
                    type='password'
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    onChange={(e) => handleChange(e)}
                />
                <button type='submit'onClick={handleSubmit}>Create Account</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form> 
        </FormContainer>
        <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: colunm;
    justify-content: center;
    gap: 1rem;
    align-items:center ;
    background-color: #131325;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img{
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;

        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: rem;
        &:focus{
            border: 0.1rem solid #997af0;
            outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span{
            color:white;
            text-transform:uppercase;
            a{
                color:#4e0eff;
                text-decoration:none;
                font-weight:bold;
                &:hover{
                    color: white;
                }
            }
        }
    }
`;

export default Register