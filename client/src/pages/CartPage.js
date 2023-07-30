import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { styled } from "styled-components";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container-fluid dashboard">
   
        <CartHeader>
        
            <h3 className="text-center"> 
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
                </h3>
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
         
    
          </CartHeader>

        <CartBody>
          <div className="row ">
            <div className="col-md-7 ">
              {cart?.map((p) => (
                <CartItem key={p._id}>
                
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                     
                    />
                    
                  <div >
                    <p>{p.name.length > 20 ? `${p.name.slice(0, 20)}...` : p.name}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  
                    <button
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                
                </CartItem>
              ))}
            </div>
            <div className="col-md-5 ">
            <CheckoutBox>
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3 address-container">
                    <h4>Current Address</h4>
                    <hr />
                    <h5>{auth?.user?.address}</h5>
                    <button
                     
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3 address-container">
                  {auth?.token ? (
                    <button
                     
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </CheckoutBox>
            </div>
          </div>
        </CartBody>
      
      
      </div>
    </Layout>
  );
};

export default CartPage;


const CartBody=styled.div`
border-radius:10px;
box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
padding:20px 10px;
background-color:#d9c9f7;
`

const CartHeader=styled.div`
border-radius:10px;
background-color:#d9c9f7;
font-weight:bold;
box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
padding:20px 0;
margin-bottom:20px;


` 

const CartItem=styled.div`
display:flex;
justify-content:space-between;
margin-bottom:20px;
align-items:center;
font-weight:bold;
background:#caaeff;
border-radius:10px;
padding-right:10px;
img{
  height:100px;
  width:100px;
}
button{
align-self:center;
padding:10px;
border-radius:10px;
border:none;
background:red;
font-weight:bold;
letter-spacing:2px;
color:white;
}
`
const CheckoutBox=styled.div`
text-align:center;
background:#caaeff;
padding:10px;
border-radius:10px;

.address-container{
  background-color:#d9c9f7;
  padding:10px 10px;
  margin:50px 0;
margin-bottom:30px;

  button{
align-self:center;
padding:5px;
border-radius:10px;
border:none;
background:yellow;
font-weight:bold;
letter-spacing:1px;
margin-top:10px;
}
}
`