import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { styled } from "styled-components";
import { useCart } from "../context/cart";
import toast from "react-hot-toast"; 
import { useMediaQuery } from "@material-ui/core";
import ProductCard from "../components/latestProduct/ProductCard";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const isSmallScreen = useMediaQuery("(max-width: 500px)");


  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
    <Wrapper>
      <ProductContainer >
      <div className="product-image">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
          />
          </div>
        <div className="product-description">
          <h1 >{product.name}</h1>
        <h6> {product?.category?.name}</h6>
        {!isSmallScreen && <p>{product?.description}</p>}
        {isSmallScreen && product?.description?.length > 800 && <p>{product?.description?.slice(0, 800)}...</p>}
          <h3>
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h3>
     
          <Button
           onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added to cart");
                      }}
          
           >ADD TO CART</Button>
        </div>
      </ProductContainer>
      <hr />
      <ProductWrapper>
        <h3>Similar Products </h3>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <SimilarProductContainer>
          {relatedProducts?.map((p,index) => (
            <ProductCard p={p} key={index} />
          ))}
      </SimilarProductContainer>
      </ProductWrapper>
</Wrapper>
</Layout>
  );
};

export default ProductDetails;

const Wrapper=styled.div`
display:flex;
flex-direction:column;
width:100%;
align-items:center;
padding:50px 0;
margin-top:60px;
` 
const ProductContainer=styled.div`
width:100%;
max-width:1200px;
display:flex;

@media screen and (max-width:800px){
  flex-direction:column;
}

.product-image{
width:40%;
img{
  width:80%;
}
@media screen and (max-width:800px){
  display: flex;
    width: 100%;
    justify-content: center;
img{
  width:60%;
}
}
}

.product-description{
  width:60%;
  padding:20px 10px;
  font-family: 'Poppins', sans-serif;
 
  @media screen and (max-width:800px){
  flex-direction:column;
  width:100%;
  padding:20px 20px;
}

h1{
margin-bottom:0;
font-weight:bolder;
letter-spacing:1px;

}
h6{
margin-top:5px;
padding:5px;
background: rgb(255,152,17);
background: linear-gradient(155deg, rgba(255,152,17,1) 21%, rgba(155,105,249,1) 85%);
width:110px;
border-radius:5px;
color:white;
}
p{
text-align:justify;
}

h3{
  font-weight:bold;
}

}

`

const Button=styled.button`
padding:15px;
border-radius:10px;
background: rgb(255,152,17);
background: linear-gradient(155deg, rgba(255,152,17,1) 21%, rgba(155,105,249,1) 85%);
border:none;
font-weight:bolder;
letter-spacing:2px;
width:100%;

&:hover{
  color:white;
}
`

const SimilarProductContainer=styled.div`
display:flex;
row-gap:20px;
column-gap:20px;
flex-wrap:wrap;
justify-content:center;


`

const ProductWrapper=styled.div`
text-align:center;
padding:50px;

h3{
  font-family:"Poppins",sans-serif;
  font-weight:bold;
  margin-bottom:50px;
}
`