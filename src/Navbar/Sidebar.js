import React, { useState,useEffect } from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo/logo3.png'
import './navbar2.css'

const SideBar = (props) => {
  const [inactive, setInactive] = useState(false);

  //variable goes here
  let token = sessionStorage.getItem('token');
  let user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    if (inactive) {
      // removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  const logOut = (e)=>{
      sessionStorage.clear();
      window.location.href = "/login"
  }

  //navigation controller
  if(token && user.userType == "Admin")
  {
     var header = 
     <>
         <NavLink to="/overview" activeClassName="active1" className="nav-link navv2" exact><span className="menu-icon"><i class="fas fa-tachometer-alt"></i></span><span className="dashboard">Overview</span></NavLink>
         <NavLink className="nav-link navv2" to="/hospital" activeClassName="active1" name="hospital"><span className="menu-icon"><i class="fas fa-hospital"></i></span><span className="dashboard">Hospitals</span></NavLink>
         <NavLink to="/users" className="nav-link navv2" activeClassName="active1"><span className="menu-icon" activeClassName="active"><i class="fas fa-users"></i></span><span className="dashboard">Users</span></NavLink>
         <NavLink to="/tickets" className="nav-link navv2" activeClassName="active1"><span className="menu-icon" activeClassName="active"><i class="fas fa-ticket-alt"></i></span><span className="dashboard">Tickets</span></NavLink>
         <NavLink to="/revenue" className="nav-link navv2" activeClassName="active1"><span className="menu-icon" activeClassName="active"><i class="fas fa-money-check-alt"></i></span><span className="dashboard">Revenue</span></NavLink>
         <NavLink to="/enquiries" className="nav-link navv2" activeClassName="active1" name="enquiry"><span className="menu-icon" activeClassName="active"><i class="fas fa-envelope"></i></span><span className="dashboard">Enquiries</span></NavLink>
         <NavLink to="/settings" className="nav-link navv2" activeClassName="active1"><span className="menu-icon" activeClassName="active"><i class="fas fa-user-cog"></i></span><span className="dashboard">Settings</span></NavLink>
         <NavLink to="#"  className="nav-link navv2"  onClick={(event)=>{logOut(event)}}><span className="menu-icon" activeClassName="active"><i class="fas fa-sign-out-alt"></i></span><span className="dashboard">Logout</span></NavLink>

     </>
  }

  else if(token && user.userType == "Hospital")
  {
    var header =
    <>
         <NavLink to="/overview" activeClassName="active1" className="nav-link navv2" exact><span className="menu-icon"><i class="fas fa-tachometer-alt"></i></span><span className="dashboard">Overview</span></NavLink>
         <NavLink to="/tickets" className="nav-link navv2" activeClassName="active1"><span className="menu-icon" activeClassName="active"><i class="fas fa-ticket-alt"></i></span><span className="dashboard">Tickets</span></NavLink>
         <NavLink to="/issueTickets" className="nav-link navv2" activeClassName="active1"><span className="menu-icon" activeClassName="active"><i class="fas fa-ticket-alt"></i></span><span className="dashboard">Issue Tickets</span></NavLink>
         <NavLink to="/revenue" className="nav-link navv2" activeClassName="active1"><span className="menu-icon" activeClassName="active"><i class="fas fa-money-check-alt"></i></span><span className="dashboard">Revenue</span></NavLink>
         <NavLink to="/settings" className="nav-link navv2" activeClassName="active1"><span className="menu-icon" activeClassName="active"><i class="fas fa-user-cog"></i></span><span className="dashboard">Settings</span></NavLink>
         <NavLink to="#"  className="nav-link navv2"  onClick={(event)=>{logOut(event)}}><span className="menu-icon" activeClassName="active"><i class="fas fa-sign-out-alt"></i></span><span className="dashboard">Logout</span></NavLink>
    </>
  }


  return (
    <>
      
      <div className={`side-menu ${inactive ? "inactive" : ""}`}>
              <div className="top-section">
                <div className="logo">
                  <img src={logo} className="w-75" alt="merocare" />
                </div>
                <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
                  {inactive ? (
                    <i class="bi bi-arrow-right-square-fill " ></i>
                    
                  ) : (
                    <i class="bi bi-arrow-left-square-fill" style={{ color: "white" }}></i>
                  
                  )}
                </div>
              </div>
              <div className="divider mt-2"></div>
           <div className="main-menu">
           
             <Navbar classname="pl-5">
               <Nav>
                 {
                   header
                 }

               </Nav>
             </Navbar>
           </div>
            </div>
    </>
  )
}

export default SideBar;
