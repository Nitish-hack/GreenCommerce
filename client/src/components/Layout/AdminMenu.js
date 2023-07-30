import React from "react";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AdminMenu = () => {

  const [auth, setAuth] = useAuth();
  const navigate=useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <Sidebar>
        <div className="text-center dashboard-menu">
          <h4 onClick={()=>navigate("/dashboard/admin/")}>DASHBOARD</h4>
          <div className="menu-items">
          <NavLink
            to="/dashboard/admin/create-category"
            
          >
            Add Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
         
          >
            Add Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
          
          >
           Edit Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders" 
          >
            Orders
          </NavLink>
          <NavLink
            onClick={handleLogout}
            to="/login"
           
          >
            Logout
          </NavLink>
          {/* <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink> */}
          </div>
        </div>
    </Sidebar>
  );
};

export default AdminMenu;


const Sidebar = styled.div`
background:#caaeff;

padding-bottom:20px;
border-radius:20px;
h4{
  border-radius:20px 20px 0 0 ;
  cursor:pointer;
}
a{
  background:#caaeff;
 border:none;
 font-weight:bold;
 letter-spacing:2px;
 &:hover{
  background-color:white;
 }
}

.menu-items{
  display:flex;
  flex-direction:column;
  row-gap:10px;
  padding: 10px;
  a {
  white-space:nowrap;
  text-decoration:none;
  color:black;
  padding:10px;
  background: #d9c9f7;
  border-radius:10px;
   
  &:hover{
    background: grey;
    color:white;
  }
  }
}

@media screen and (max-width:768px){
.menu-items{
  flex-direction:row;
  justify-content:space-around;
  overflow: auto;
    column-gap: 10px;
    overflow-x: hidden;
 padding-bottom:0;

a{
  border-radius:0 0 10px 10px;
}
}

h4{
  display:none;
}
margin-bottom:30px;
margin-top:-65px;
}


`
