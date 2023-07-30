import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { styled } from "styled-components"; 
import { useMediaQuery } from "@material-ui/core";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const isSmallScreen = useMediaQuery("(max-width: 550px)");
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
    <div className="container-fluid dashboard">
      <div className="row ">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
        <OrderContainer>
          <h4 className="text-center">ALL ORDERS</h4>
          <div className="order-details">
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                 <OrderList>
                  {o?.products?.map((p, i) => (
                    <SingleOrder  key={p._id}>
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        
                        />
                      <div className="col-md-10">
                        <p>{p.name}</p>
                        <p>Price : ${p.price}</p>
                      </div>
                    </SingleOrder>
                  ))}
                </OrderList>
              </div>
            );
          })}
        </div>
        </OrderContainer>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;


const OrderContainer=styled.div`
background:#caaeff;
border-radius:20px;
h4{
  background-color: #434343;
border-radius:20px 20px 0 0;
  color:white;
  padding:20px;
}

.order-details{
  padding:10px;

}

`
const OrderList=styled.div`
display:flex;
gap:10px;
padding:10px;
flex-wrap:wrap;  
`
const SingleOrder=styled.div`
display:flex;
background:#f7f2ff;
column-gap:10px;
width:30%;
min-width:205px;
border-radius:10px;
font-weight:bold;

@media screen and (max-width:500px) {
  width:100%;
}
img{
  height:100px;
  width:100px;
  border-radius:10px 0 0 10px;
}

div{
  display:flex;
  flex-direction:column;
  justify-content:center;
 
}

`