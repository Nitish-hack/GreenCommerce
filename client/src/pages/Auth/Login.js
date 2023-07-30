import React, { useState } from 'react'
import styled from "styled-components"
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
//form validation 
function validateInputs() {
  // Password validation
  // At least 8 characters long, with a combination of letters, numbers, and special symbols
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    toast.error("Password must be at least 8 characters long and contain letters, numbers, and special symbols.");
    return false;
  }

  return true; // Both phone number and password are valid
}

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      
      return;
    }
    try {
        const res = await axios.post("/api/v1/auth/login", {
          email,
          password,
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(location.state || "/");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
  };

  return (
    <Layout title="Register - GreenCommerce">
      <Wrapper>
        <FormContainer onSubmit={handleSubmit}>
          <h2>LOGIN</h2>
         
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Your Email'
            required
            autoFocus
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Your Password'
            required
          />
          
          <button>LOGIN</button>
          <p><span  onClick={() => {
                navigate("/login");
              }}>Forgot Password?</span> </p>
        </FormContainer>



      </Wrapper>
    </Layout>
  )
}

export default Register;

const Wrapper = styled.div`
display:flex;
margin-top:60px;
min-height:100vh;
background:white;
align-items:center;
justify-content:center;
background:url("/images/collage.png")  ;
background-size: cover;
background-repeat: no-repeat;
`

const FormContainer = styled.form`
width:500px;
display:flex;
flex-direction:column;
row-gap:20px;
padding:20px;
${'' /* background:rgba(0,0,0,0.3); */}
background-color:#d9c9f7;
box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
border-radius:20px; 
h2,p{
  text-align:center;
}
input{
font-size:17px;
padding:10px;
border-radius:10px;
border:none;
}
button{
    padding:10px;
    letter-spacing:2px;
    font-weight:bold;
    border:none;
    &:hover{
      background:purple;
      color:white;
    }
}

span{
  cursor:pointer;
  color:purple;
  font-weight:bold;
}

@media screen and (max-width:530px){
  width:90%;
}

`
