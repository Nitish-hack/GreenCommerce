import React from "react";
import Layout from "./../components/Layout/Layout";
import { styled } from "styled-components";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
    <AboutContainer>
    <h1>ABOUT US</h1>
     <img src="/favicon.png" alt="aboutusimage" />
     <div>
     <p>
     Welcome to GreenCommerce, your ultimate destination for guilt-free shopping! GreenCommerce is built by <span>NITISH KUMAR JHA</span> with a vision to promote sustainable living and eco-friendly choices. We are dedicated to curating a wide range of sustainable and recycled products that not only meet your needs but also protect our precious environment. 
<br></br>
At GreenCommerce, we believe that every small choice we make can have a significant impact on the planet. That's why we handpick each product with great care, ensuring that it aligns with our mission of promoting eco-friendly living.
<br></br>

Our collection includes a diverse selection of eco-conscious items, from stylish apparel made from organic fabrics to innovative household products crafted from recycled materials. We partner with ethical and environmentally responsible brands that share our vision of a greener future.
<br></br>

As a conscious consumer, you can shop with confidence, knowing that every purchase you make at GreenCommerce contributes to positive environmental change. Together, we can take steps towards a more sustainable world, one purchase at a time.

<br></br>
Join us on this eco-friendly journey, and together, let's make a difference for the planet we call home. Shop at GreenCommerce today and be a part of the sustainable revolution!

     </p>
     </div>
    </AboutContainer>
    </Layout>
  );
};

export default About;


const AboutContainer=styled.div`
margin-top:60px;
padding:10px 50px;
padding-bottom:50px;
text-align:center;
background:#0000000f;
display:flex;
flex-direction:column;
row-gap:20px;

span{
  color:red;
}
@media screen and (max-width:700px){
  img{
    width:300px;
  }
  padding:10px 20px;
}

img{
  align-self:center;
}
div{
  background:#d9c9f7;
  padding:20px;
  font-size:1.2rem;
  border-radius:10px;
}
p{  
  text-align:justify;
  font-weight:bold;
}

`

