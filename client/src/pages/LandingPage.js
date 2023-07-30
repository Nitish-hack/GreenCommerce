import Layout from "./../components/Layout/Layout";
import React from 'react'
import styled from "styled-components";
import 'animate.css';
import ProductList from "../components/latestProduct/ProductList";
import useCategory from "../hooks/useCategory";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const categories = useCategory();
  const navigate=useNavigate();
  return (
    <Layout title={"Homepage"}>
     {/* <CategoriesContainer>
     {categories?.map((c,index) => (
                    <Link key={index} to={`/category/${c.slug}`}>{c.name}</Link> 
                  ))}
     </CategoriesContainer> */}
  <Wrapper>
   <HeroBanner>
     <div className="text animate__animated animate__fadeIn">
    <h2>GreenCommerce</h2> 
    <p>Embrace Eco-Friendly Living with GreenCommerce: Your Destination for Sustainable, Recycled, and Planet-Friendly Products!</p>
 <Button onClick={()=>navigate("/products")}>Shop Now</Button>
    </div>
   </HeroBanner>
   
   <CollageContainer>
   <img className="animate__animated animate__fadeInLeft" src="/images/collage.png" alt="collage" />
   <CollageContent className="animate__animated animate__fadeInRight">
    <h3>GreenCommerce</h3>
    <div className="company-desc" >
    <p>Welcome to GreenCommerce, your ultimate destination for guilt-free shopping! We are dedicated to curating a wide range of sustainable and recycled products that not only meet your needs but also protect our precious environment.
<br />
At GreenCommerce, we believe that every small choice we make can have a significant impact on the planet. That's why we handpick each product with great care, ensuring that it aligns with our mission of promoting eco-friendly living.
<br />
Our collection includes a diverse selection of eco-conscious items, from stylish apparel made from organic fabrics to innovative household products crafted from recycled materials. We partner with ethical and environmentally responsible brands that share our vision of a greener future.
<br />
Join us on this eco-friendly journey, and together, let's make a difference for the planet we call home. Shop at GreenCommerce today and be a part of the sustainable revolution!</p>
</div>
   </CollageContent>
   </CollageContainer>
   <ProductList /> 
   </Wrapper>
    </Layout>
  )
} 

export default LandingPage;

const HeroBanner=styled.div`
background-image:url("/images/landingbanner.webp") ;
background-position:left;
margin-top:55px;
height:400px;
background-size: cover;
background-repeat: no-repeat; 
display:flex;
.text{
  width:30%;
 align-self:center;
 margin-left:30px;
font-size:15px;
font-weight:bold;
color:#5b575b;

h2{
  font-size:2.5rem;
margin-bottom:10px;
color:#5f5466;
font-weight:bolder;
}
}

@media screen and (min-width:901px) {
  .text{
  width:30%;
 align-self:center;
 margin-left:30px;
font-size:15px;

h2{
  font-weight:bolder;
  font-size:3rem;
  
}
}
}

@media screen and (max-width:900px) {
  height:300px;
}


@media screen and (max-width:750px) {
   height:200px;
   .text{
    width:50%;
    font-size:10px;
    h2{
      font-size:2rem;
    }
    }
}
@media screen and (max-width:670px) {
  height:170px;
   .text{
    h2{ 
      font-size:1.5rem;
      margin-top:10px;
   margin-bottom:5px;

      
      }
   }
}
`

const Button =styled.button`
padding:5px  15px;
border-radius:10px;
border:none;
background: rgb(255,152,17);
background: linear-gradient(155deg, rgba(255,152,17,1) 21%, rgba(155,105,249,1) 85%);
color:black;
transition:0.5s all;
font-weight:bold;
&:hover{
  transform:scale(1.2);
  margin-left:10px;
  color:white;
}

`
const CollageContainer=styled.div`
display:flex;
margin:100px 0;
padding: 20px 60px;


img{  
  width:50%;
  border-radius:10px 0 0 10px;
} 

@media screen and (max-width:1000px) {
  flex-direction:column;
  padding:0px 20px;
  
  img{width:100%;
  border-radius:10px 10px 0 0;
  }
}

`
const CollageContent=styled.div`
font-family: 'Poppins', sans-serif;
text-align:justify;
font-weight:bold;
width:50%;
padding:10px 10px;
background:#d9c9f7;
color:#5b575b;
 border-radius:0 10px 10px 0;
 h3{
  font-size:2rem;
  padding:0 10px;
  font-weight:bolder;
  letter-spacing:1px;
}
.company-desc{
  background:#ecccdf;
  border-radius:30px;
  padding:10px 10px;
}

@media screen and (max-width:1000px) {
 width:100%;
 text-align:center;
 border-radius:0 0 10px 10px;
 p{
  text-align:justify;
 }
 h3{
  padding:0;
 }
}

@media screen and (max-width:500px){
  p{
    font-size:12px;
  }
}
`
const CategoriesContainer=styled.div`
display:flex;
margin-top:60px;
column-gap:20px;
font-wieght:bold;
padding:10px;
justify-content:center;
background:white;
a:hover{
  color:red;
}
`
const Wrapper=styled.div`
height:100%;
width:100%;
background:#0000000f;
`