import AdminMenu from "../../components/Layout/AdminMenu";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { styled } from "styled-components";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Admin Dashboard - Ecommerce App"}>
      <div className="container-fluid dashboard">
        <div className="row">
      
       
          <div className="col-md-3">
            <AdminMenu />
          </div>
        
          <div className="col-md-9">
            <UserDetails>
            <div className="heading">
            <img src="/images/usericon.png" alt="usericon" />
              <h2>Hello {auth?.user?.name}</h2>
              </div>

              <div className="details">
              <div className="item">
              <h2>Email:</h2>
              <h3>{auth?.user?.email}</h3>
              </div>
              <div className="item">
              <h2>Address:</h2>
              <h3>{auth?.user?.address}</h3>  
              </div>
              </div>
              </UserDetails>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;


const UserDetails=styled.div`
display:flex;
flex-direction:column;
row-gap:20px;

.heading{
  display:flex;
  align-items:center;

  img{
    height:120px;
    margin-top:-20px;
  }
  h2{
    font-weight:bold;
    font-size:3rem;
  }
}

.details{
  display:flex;
  div{
    h2{
      background-color: #434343 ;
      color:white;
      padding:10px;
      border-radius:10px 10px 0 0 ;

    }
 h3{
  padding:10px;
 }
    background:#caaeff;
     margin-right:1%;
     border-radius:10px;
      width:49%;
  }
  @media screen and (max-width:500px){
  flex-direction:column;
  row-gap:20px;
  div{
    width:100%;
  }
}
}


`