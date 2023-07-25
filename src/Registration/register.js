import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import image from '../assets/logo/obj2.png'
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import usePassword from '../common/usePassword';
import useLoader from '../common/useLoader';
import Loader from '../common/loader'


const digitizer = (n) => {
    let num = n;
    if (num < 10) {
        num = "0" + num;
    }
    return num
}

const getFormattedToday = (date) => {
    return `${date.getFullYear()}-${digitizer(date.getMonth() + 1)}-${digitizer(date.getDate())}`
}

let today = new Date();
today.setFullYear(today.getFullYear() - 16);
let maxDate = getFormattedToday(today);
today.setFullYear(today.getFullYear() - 64);
let minDate = getFormattedToday(today);


const Register = (props) => {
    let { } = props;
    let { addToast } = useToasts();
    let {eye,passwordToggler,eye2,passwordToggler2} = usePassword();
    let {loading,loadingHandler} = useLoader()
    //state goes here
    let [userDetails, setDetails] = useState({
        "firstName": "",
        "lastName": "",
        "email": "",
        "userName": "",
        "phoneNumber": "",
        "address": "",
        "dob": "",
        "gender": "",
        "password": "",
        "confirmPassword": "",
        "errors": {}
    })
    let [btnDisable, setDisable] = useState(true);

    //effect goes here
    useEffect(() => {
        if (userDetails.gender == "Male") {
            document.querySelector('#Male').checked = true;
        }
        else if (userDetails.gender == "Female") {
            document.querySelector('#Female').checked = true;
        }
        if (userDetails.gender == "Other") {
            document.querySelector('#Other').checked = true;
        }
    }, [userDetails.gender])

    

    //event handlers goes here
    const changeHandler = (e) => {
        let { name, value } = e.target;
        setDetails({
            ...userDetails,
            [name]: value
        })
    }

    const registerUser = (e) => {
        e.preventDefault();
        loadingHandler(true)
        axios.post(process.env.REACT_APP_URL + "registerUser", userDetails)
            .then((response) => {
                if (response.data.success == true) {
                    addToast(response.data.message, {
                        "autoDismiss": true,
                        "appearance": "success"
                    })
                    sessionStorage.clear();
                    localStorage.clear();
                    window.location.href = "/login"
                }
                else {
                    addToast(response.data.message, {
                        "autoDismiss": true,
                        "appearance": "error"
                    })
                    setDetails({
                        ...userDetails,
                        ['errors']: response.data.error,
                        ['gender']:""
                    })
                    setDisable(
                        true
                    )
                }
                loadingHandler(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <React.Fragment>
            {
                loading == true?
                (
                    <Loader/>
                ):
                (
                    <section className="Form my-4">
                <div className="container">
                    <div className="row reg">
                        <div className="col-lg-6 col-sm-12 reg-image my-auto">
                            <img src={image} alt='image' style={{width:"100%"}} />
                        </div>
                        <div className="col-lg-6 col-sm-12 px-3 py-4 bg__color">
                            <h1 className="font-weight-bold mb-2 pb-3 text-center">Register</h1>
                            <form method="post" className="reg__form" onSubmit={registerUser}>
                                <Row>
                                    <Col lg={6} md={12} xs={12}>
                                        <div className="form-row">
                                            <div className="un">
                                                <div className="form-group">
                                                    <label> First Name</label>
                                                    <input type="text" name="firstName" placeholder="Enter your Firstname" value={userDetails.firstName} onChange={(event) => { changeHandler(event) }} className="form-control my-3 p-3" />
                                                    {userDetails['errors']['firstName'] && (<p className="text-center mt-0 mb-0"> <small style={{ color: "white" }}> *{userDetails['errors']['firstName']} </small> </p>)}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col lg={6} md={12} xs={12}>
                                        <div className="form-row">
                                            <div className="un">
                                                <div className="form-group">
                                                    <label> Last Name</label>
                                                    <input type="text" name="lastName" placeholder="Enter your Lastname" value={userDetails.lastName} onChange={(event) => { changeHandler(event) }} className="form-control my-3 p-3" />
                                                    {userDetails['errors']['lastName'] && (<p className="text-center  mt-0 mb-0"> <small style={{ color: "white" }}> *{userDetails['errors']['lastName']} </small> </p>)}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} md={12} xs={12}>
                                        <div className="form-row">
                                            <div className="un">
                                                <div className="form-group">
                                                    <label>  Username</label>
                                                    <input type="text" name="userName" placeholder="Enter your username" value={userDetails.userName} onChange={(event) => { changeHandler(event) }} className="form-control my-3 p-3" />
                                                    {userDetails['errors']['userName'] && (<p className="text-center  mt-0 mb-0"> <small style={{ color: "white" }}> *{userDetails['errors']['userName']} </small> </p>)}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={12} xs={12}>
                                        <div className="form-row">
                                            <div className="un">
                                                <div className="form-group">
                                                    <label> Mobile Number</label>
                                                    <input type="text" name="phoneNumber" maxLength="10" placeholder="Enter your mobile number" value={userDetails.phoneNumber} onChange={(event) => { changeHandler(event) }} className="form-control my-3 p-3" />
                                                    {userDetails['errors']['phoneNumber'] && (<p className="text-center  mt-0 mb-0"> <small style={{ color: "white" }}> *{userDetails['errors']['phoneNumber']} </small> </p>)}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="form-row">
                                    <div className="un">
                                        <div className="form-group">
                                            <label> Email Address</label>
                                            <input type="email" name="email" placeholder="Enter your Email Address" value={userDetails.email} onChange={(event) => { changeHandler(event) }} className="form-control my-3 p-3" />
                                            {userDetails['errors']['email'] && (<p className="text-center  mt-0 mb-0"> <small style={{ color: "white" }}> *{userDetails['errors']['email']} </small> </p>)}
                                        </div>
                                    </div>
                                </div>
                                <Row>
                                    <Col lg={6} md={12} xs={12}>
                                        <div className="form-row">
                                            <div className="un">
                                                <div className="form-group">
                                                    <label> Address</label>
                                                    <input type="text" name="address" placeholder="Enter your Address" value={userDetails.address} onChange={(event) => { changeHandler(event) }} className="form-control my-3 p-3" />
                                                    {userDetails['errors']['address'] && (<p className="text-center  mt-0 mb-0"> <small style={{ color: "white" }}> *{userDetails['errors']['address']} </small> </p>)}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={12} xs={12}>
                                        <div className="form-row">
                                            <div className="un">
                                                <div className="form-group">
                                                    <label> DOB</label>
                                                    <input type="date" name="dob" placeholder="Enter your mobile number" min={minDate} max={maxDate} value={userDetails.dob} onChange={(event) => { changeHandler(event) }} className="form-control my-3 p-3" />
                                                    {userDetails['errors']['dob'] && (<p className="text-center  mt-0 mb-0"> <small style={{ color: "white" }}> *{userDetails['errors']['dob']} </small> </p>)}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="form-row">
                                    <div className="un">
                                        <div className="form-group mb-2">
                                            <label> Select Your Gender</label>
                                            {userDetails['errors']['gender'] && (<p className="text-center  mt-0 mb-0"> <small style={{ color: "white" }}> *{userDetails['errors']['gender']} </small> </p>)}
                                        </div>
                                        <div className="mb-2">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" id="Male" value="Male" onChange={(event) => { changeHandler(event) }} />
                                                <label className="form-check-label" for="Male">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" id="Female" value="Female" onChange={(event) => { changeHandler(event) }} />
                                                <label className="form-check-label" for="Female">Female</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" id="Other" value="Other" onChange={(event) => { changeHandler(event) }} />
                                                <label className="form-check-label" for="Other">Other</label>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="un">
                                        <div className="form-group">
                                            <label> Password</label>
                                            <div className="input-group">
                                                <input type="password" name="password" placeholder="Enter your Password" value={userDetails.password} onChange={(event) => { changeHandler(event) }} className="form-control my-3 p-3 password" />
                                                {
													eye == true?
													(
														<span className="icon-inside" style={{cursor:"pointer"}} onClick={(e)=>{passwordToggler(e)}}><AiFillEye style={{color:"grey",fontSize:"32px"}}/></span>
													):
													(
														<span className="icon-inside"  style={{cursor:"pointer"}}  onClick={(e)=>{passwordToggler(e)}}><AiFillEyeInvisible style={{color:"grey",fontSize:"32px"}}/></span>
													)
												}
                                            </div>
                                            {userDetails['errors']['password'] && (<p className="text-center  mt-0 mb-0"> <small style={{ color: "white" }}> *{userDetails['errors']['password']} </small> </p>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="un">
                                        <div className="form-group">
                                            <label> Confirm Password</label>
                                            <div className="input-group">
                                                <input type="password" name="confirmPassword" placeholder="Confirm your Password" value={userDetails.confirmPassword} onChange={(event) => { changeHandler(event) }} className="form-control my-3 p-3 password2" />
                                                {
													eye2 == true?
													(
														<span className="icon-inside" style={{cursor:"pointer"}} onClick={(e)=>{passwordToggler2(e)}}><AiFillEye style={{color:"grey",fontSize:"32px"}}/></span>
													):
													(
														<span className="icon-inside"  style={{cursor:"pointer"}}  onClick={(e)=>{passwordToggler2(e)}}><AiFillEyeInvisible style={{color:"grey",fontSize:"32px"}}/></span>
													)
												}
                                            </div>
                                            {userDetails['errors']['confirmPassword'] && (<p className="text-center  mt-0 mb-0"> <small style={{ color: "white" }}> *{userDetails['errors']['confirmPassword']} </small> </p>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" id="check" onChange={() => { setDisable(!btnDisable) }} />
                                    <label className="ms-2" for="check"> I agree terms and conditions. </label>
                                </div>
                                {userDetails['errors']['random'] && (<p className="text-center  mt-0 mb-0"> <small style={{ color: "white" }}> *{userDetails['errors']['random']} </small> </p>)}
                                <div class="form-row">
                                    <div className="un text-center">
                                        <button type="submit" className="btn btn-lg mt-3 mb-4 bg-white reg__btn" style={{boxShadow:"4px 3px 8px #424242",padding:"7px 120px"}} name="register" disabled={btnDisable}> Register </button>
                                    </div>
                                </div>
                                <p className="text-white text-center">Already have an account? <a style={{color:"#f0f0f0",fontWeight:"600",textDecoration:"none"}} href="/login">Login</a></p>
                            </form>
                        </div>
                    </div>
                </div>

            </section>
                )
            }
            

        </React.Fragment>
    )
}

export default Register
