import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
const UserMenu = () => {
  const [auth, setAuth] = useAuth();
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
          <h4>DASHBOARD</h4> 
        <div className="menu-items">
          <NavLink 
            to="/dashboard/user/profile"
      
          >
           Edit Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
           
          >
            Orders
          </NavLink>

          <NavLink
            onClick={handleLogout}
            to="/login"
           
          >
     
            Logout
          </NavLink>
        </div>
      </div>
    </Sidebar>
  );
};

export default UserMenu;

const Sidebar = styled.div`
background:#caaeff;

padding-bottom:20px;
border-radius:20px;
h4{
  border-radius:20px 20px 0 0 ;
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



