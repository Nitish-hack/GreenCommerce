import React,{useState} from 'react';
import SimpleReactFooter from 'simple-react-footer';
import { styled } from 'styled-components';
import Socials from "./Socials"
const Footer = () => {
  // Define the data for the footer
const [clicked,setClicked]=useState(false);

  const description = "Welcome to GreenCommerce, your ultimate destination for guilt-free shopping! We are dedicated to curating a wide range of sustainable and recycled products that not only meet your needs but also protect our precious environment.As a conscious consumer, you can shop with confidence, knowing that every purchase you make at GreenCommerce contributes to positive environmental change. Together, we can take steps towards a more sustainable world, one purchase at a time.";
  const title = "GreenCommerce";

  const columns = [{
    title: "Features",
    resources: [{
      name: "Login",
      link: "/login"
    },{
      name: "Register",
      link: "/register"
    },{
      name: "Products",
      link: "/products"
    },{
      name: "Cart",
      link: "/cart"
    }]
  },{
    title: "Company",
    resources: [
      {
      name: "Contact",
      link: "/contact"
    },
      {
      name: "About",
      link: "/about"
    },
    {
      name: "Policy",
      link: ""
    }]
  },{
    title: "Other",
    resources: [{
      name: "Blog",
      link: ""
    },{
      name: "Guides",
      link: ""
    }]
  }];

  return(
  <FooterContainer>
  <SimpleReactFooter
    description={description}
    title={title}
    columns={columns}
    iconColor="black"
    backgroundColor="lightgrey"
    fontColor="black"
  
  />
  <div className='socials'>
  <h3>Get in Touch</h3>
  <Socials />
  <p>&copy; 2023 Nitish Kumar Jha. All rights reserved.</p>
  </div>
  <div className="clickmebtn" >
  {!clicked && <p onClick={()=>setClicked(true)}>Click me</p>}
  {clicked && <div className='adminmessage'>
  <button onClick={()=>setClicked(false)}>close</button>
  <br></br>

  If you want to see admin page and dashboard , login as admin
  <br />
  Email : admin@gmail.com
  <br/>
  Password : admin@99
<br />
<span className='note'>Note:This is just for showcase purpose! </span>
  </div>}
  </div>
  </FooterContainer>
  );

}

export default Footer;

const FooterContainer=styled.div`
 background:#d3d3d3;
 padding:50px 0;
.footer-container{
  margin-top:0;
}
a{
  text-decoration:none;
}
.second-title{
  font-weight:bold;
}
.socials{
  display:flex;
  background:#d3d3d3;
  flex-direction:column;
 align-items:center;
 h3{
  color:#5b575b;
 }
 p{
  margin-top:20px;
  font-weight:bold;
  color:grey;
 }
}
@media screen and (max-width:835px){ 
  padding:20px 0;
.description{
  margin-right:0
}
} 

.copyright{
  display:none;
}

.clickmebtn{
  bottom:10px;
  background:purple;
  right:10px;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:10px;
  color:white;
  font-weight:bold;
  padding:10px;
  position:fixed;
cursor:pointer;
p{
  margin:0;
  &:hover{
    color:peachpuff;
  }
}
  .adminmessage{
    font-size:14px;
    @media screen and (max-width:600px){
      font-size:12px;
      width:300px
    }
    @media screen and (max-width:400px){
      font-size:11px;
      width:250px
    }
    button{
      color:white;
      font-weight:bold;
   background:red;
   padding:5px;
   border-radius:5px;
   border:none;
      float:right;
      font-size:12px;

    }
    .note{
      font-size:12px;
      color:grey;
    }
  }
}
`
