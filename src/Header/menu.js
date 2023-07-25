import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { GiTicket } from 'react-icons/gi'
import logo from '../assets/logo/newlogo.png'
import { MenuItem } from '@material-ui/core';
import profile from '../assets/profile.jpg';
import { Link } from 'react-scroll'

const Menu = (props) => {
    let { } = props
    //variable goes here
    let token = sessionStorage.getItem('token');
    let user = JSON.parse(sessionStorage.getItem('user'));

    const logOut = (e) => {
        sessionStorage.clear();
        window.location.href = "/login"
    }

    if (token && user.userType == "User") {
        var header =
            <>
                <Nav className="ms-auto">
                    <NavLink className="nav-link navv" activeClassName="active" to="/" smooth={true} duration={500} exact> Home </NavLink>
                    <NavLink className="nav-link navv" activeClassName="active" to="/myTickets"> My Tickets</NavLink>
                    <NavLink className="nav-link navv buy-tic px-3" activeClassName="buy_ticket_btn" to="/hospitals"> <GiTicket style={{ fontSize: "25px", fontWeight: "bold" }} />  Buy Tickets</NavLink>


                </Nav>
                <Nav className="mx-right">
                    <div className="pull-left">
                        {
                            user.profilePicture == "no-photo.jpg" ?
                                (
                                    <>

                                        <div className="userData pimage" style={{ background: "#4b1cac", backdropFilter: "blur(10px)" }}>
                                            <p style={{ fontWeight: "bold", color: "white", textAlign: "center", fontSize: "14px", position: "relative", top: "8px" }}> {user.firstName.slice(0, 1)}{user.lastName.slice(0, 1)}  </p>
                                        </div>

                                    </>
                                ) :
                                (
                                    <img className="thumbnail-image pimage"
                                        src={`${process.env.REACT_APP_URL}${user.profilePicture}`}
                                        alt="user pic" roundedCircle
                                    />
                                )
                        }


                    </div>
                    {/* <a href="#" className="my-auto" style={{listStyle:'None', textDecoration:'None', color:'#000000'}}> {user.firstName} {user.lastName}</a> */}
                    <NavDropdown id="basic-nav-dropdown" title={`${user.firstName} ${user.lastName}`} renderMenuOnMount={true}>
                        <NavDropdown.Item href="/profile" className="pr-2">My Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#" onClick={(e) => { logOut(e) }} className="pr-2">Logout</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
            </>
    }
    else {
        var header =
            <>
                <Nav className="ms-auto">
                    <NavLink className="nav-link navv" activeClassName="active" to="/" smooth={true} duration={500} exact> Home </NavLink>
                    <Link className="nav-link navv" activeClassName="active" to="about" style={{cursor:"pointer"}} smooth={true} duration={500}> About Us</Link>
                    <Link className="nav-link navv" activeClassName="active" to="contact" style={{cursor:"pointer"}} smooth={true} duration={500}> Contact</Link>
                    <NavLink className="nav-link navv buy-tic px-3" activeClassName="buy_ticket_btn" to="/login"> <GiTicket style={{ fontSize: "25px", fontWeight: "bold" }} />  Buy Tickets</NavLink>


                </Nav>

            </>
    }

    return (
        <React.Fragment>

            <Navbar expand="lg">
                <Container fluid>
                    <Navbar.Brand href="/" className="w-25 py-3"><img src={logo} className="w-50" alt="merocare" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {
                            header
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>



        </React.Fragment>
    )
}

export default Menu
