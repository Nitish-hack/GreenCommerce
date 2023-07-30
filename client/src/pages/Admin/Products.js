import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ProductCard from "../../components/latestProduct/ProductCard"
import { styled } from "styled-components";
import {AiFillEdit} from "react-icons/ai"
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
    <div className="container-fluid  dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <ProductWrapper className="col-md-9 ">
          <h4 className="header">EDIT PRODUCTS</h4>
          <ProductContainer>
            {products?.map((p) => (

                <SingleProductWrapper> 
                <Link  to={`/dashboard/admin/product/${p.slug}`}><AiFillEdit /></Link>
                 <ProductCard p={p} adminProduct={true} /> 
                 </SingleProductWrapper>
            ))}
          </ProductContainer>
        </ProductWrapper>
      </div>
      </div>
      
    </Layout>
  );
};

export default Products;

const SingleProductWrapper=styled.div`

a{
  position:absolute;
  background:purple;
  text-decoration:none;
  z-index:999;
  cursor:pointer;
  width:50px;
  height:50px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  font-weight:bolder;
  font-size:2rem;
border-top-left-radius:10px;
  :hover{
    font-size:2.2rem;
  }
}
`
const ProductWrapper=styled.div`
background:#caaeff;
border-radius:20px;
padding:0;
padding-bottom:20px;
.header{
  background-color: #434343;
border-radius:20px 20px 0 0;
  color:white;
  padding:20px;
}


`
const ProductContainer=styled.div`
  display: flex;
  gap:10px;
  justify-content:center;
  flex-wrap:wrap;

`
