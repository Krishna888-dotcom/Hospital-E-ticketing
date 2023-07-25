
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Button, Card } from 'react-bootstrap'
import home_image from '../assets/new_home.png'
import logo from '../assets/home_image.png'
import { Link } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
import logo_ca from '../assets/logo/merocare.png'
import buyticekt from '../assets/buyticekt.png'
import payment from '../assets/payment.png'
import searchhospital from '../assets/searchhospital.png'
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import {useToasts} from 'react-toast-notifications'
import useLoader from '../common/useLoader'
import Skeleton from '../common/Skeleton'


const Home = (props) => {
	const {addToast} = useToasts();
	const {skeletonLoading,skeletonHandler} = useLoader();
	const [isLoading, setLoading] = useState(false);
	const  [hospitals,setHospitals] = useState([]);
	let [enquiryDetail,setEnquiryDetail] = useState({
		"firstName":"",
		"lastName":"",
		"emailAddress":"",
		"enquiry":"",
		"address":"",
		"contact":"",
		"errors":{}
	})



	useEffect(()=>{
		skeletonHandler(true)
		axios.get(process.env.REACT_APP_URL+"fetchHospitals")
		.then((response)=>{
			console.log(response)
			if(response.data.success == true)
			{
				setHospitals(
					response.data.data
				)
			}
			else
			{
				setHospitals([])
			}
			skeletonHandler(false)
		})
		.catch((err)=>{
			console.log(err);
		})
	},[])

	Aos.init({
		duration: 2000
	})

	const changeHandler = (e)=>{
		const {name,value} = e.target;
		setEnquiryDetail({
			...enquiryDetail,
			[name]:value
		})
	}

	const addEnquiry = (e)=>{
		e.preventDefault();
		setLoading(true)

		axios.post(process.env.REACT_APP_URL+"addEnquiry",enquiryDetail)
		.then((response)=>{
			
			if(response.data.success == true)
			{
				addToast(response.data.message,{
					"appearance":"success",
					"autoDismiss":true
				})
				setEnquiryDetail({
					...enquiryDetail,
					['firstName']:"",
					['lastName']:"",
					['address']:"",
					['contact']:"",
					['emailAddress']:"",
					['enquiry']:""
				})
			}
			else
			{
				setEnquiryDetail({
					...enquiryDetail,
					['errors']:response.data.error
				})
			}
			setLoading(false)
		})
		.catch((err)=>{
			console.log(err);
		})
	}

	return (
		<>
			<Container fluid className="home__background" id="home">

				<Row>
					<Col lg={1}></Col>
					<Col lg={4} className="pt-5" data-aos="flip-right">
						<h2 className="heading__top">Buy a ticket</h2>
						<h2 className="heading__top">Online</h2>
						<p className="pt-5 heading_para">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
							sed diam nonumy eirmod tempor invidunt ut labore et
							dolore magna aliquyam erat, sed diam voluptua. At
							vero eos.</p>
						<Link to="#" className="btn btn-learn">Learn More</Link>
					</Col>

					<Col>
						<img src={home_image} className="w-100 py-5" data-aos="fade-right"></img>
					</Col>


				</Row>

			</Container>
			<Container id="about" data-aos="fade-up">
				<Row>
					<Col lg={12} sm={12} className='pt-5 text-center'>
						<h2 className="heading__1">Welcome to E-ticketing and Consultation</h2>
					</Col>
					<div className="mt-5"></div>
					<Col lg={6} md={6} sm={12}>
						<img src={logo} alt="merocare" className="w-100" />
					</Col>
					<Col lg={6} md={6} sm={12} className="py-5">
						<p className="heading__3">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
							justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
							sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
							invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
							duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
							amet.</p>
					</Col>

				</Row>

			</Container>
			<Container className="pt-5" data-aos="zoom-in">
				<Row>
					<Col lg={12} sm={12} className='pt-5 text-center'>
						<h2 className="heading__1 pb-3 ">Services</h2>
					</Col>
					<Col lg={4} md={4} sm={12} className="pb-2" data-aos="flip-right">
						<Card>
							<Card.Img variant="top" src={searchhospital} className="mx-auto py-2" style={{ height: "322px" }} />
							<Card.Body>
								<Card.Title className="dominefont">Find Hospital</Card.Title>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk of
									the card's content.
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col lg={4} md={4} sm={12} className="pb-2" data-aos="zoom-in">
						<Card>
							<Card.Img variant="top" src={buyticekt} className="mx-auto py-2" style={{ height: "322px" }} />
							<Card.Body>
								<Card.Title className="dominefont">Buy Ticket</Card.Title>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk of
									the card's content.
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col lg={4} md={4} sm={12} className="pb-2" data-aos="zoom-in">
						<Card>
							<Card.Img variant="top" src={payment} className="mx-auto py-2 w-75" style={{ height: "322px" }} />
							<Card.Body>
								<Card.Title className="dominefont">Instant Payment</Card.Title>
								<Card.Text>
									Some quick example text to build on the card title and make up the bulk of
									the card's content.
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>

				</Row>
			</Container>
			<Container>
				<Row>
					<Col lg={12} sm={12} className='pt-5 text-center'>
						<h2 className="heading__1">Our Partner Hospitals and Clinics</h2>
					</Col>
				</Row>
	
					{
						skeletonLoading == true?
						(
							<Skeleton/>
						):
						(
							<OwlCarousel className='owl-theme owl-loading' touchDrag={false} pullDrag={false} autoplay items="5" loop margin={10} dots={false}>
								{
									
									hospitals.map((val)=>{
										return (
											<div className='item'>
												<img src={`${process.env.REACT_APP_URL}${val.hospitalImage}`} alt={val.hospitalName} className="carousel-image" />
											</div>
										)
									})
									
								}
							
							</OwlCarousel>
						)
					}
				

			</Container>
			<Container className="contact__container mt-3" fluid id="contact" data-aos="fade-up-right">
				<Container className="contact__wrapper">
					<Row>
						<Col lg={5} sm={12} md={5} className="contact-text" data-aos="flip-down" data-aos-duration="3000">
							<h3>Get in Touch</h3>
							<div className="border-line mb-5 d-flex"></div>
							<p>Contact us through this form to discover how Teladoc Health can
								add value to your organization, or call us at 1-844-798-3810.</p>
							<div className="contact__icons mb-3 mt-5">
								<ul className="list-group">
									<li className="list-group-item"><span><i class="fas fa-phone"></i> +977- 1-1234567</span> </li>
									<li className="list-group-item"><span><i class="fas fa-globe"></i>example@techinnovate.com.np</span> </li>
									<li className="list-group-item"><span><i class="fas fa-map-marker-alt"></i> Bhanubhakta Marg, Kathmandu,
										Nepal</span> </li>
								</ul>
							</div>
						</Col>
						<Col lg={7} sm={12} md={7}>
							<Form className="contact__form" data-aos="zoom-in-left" data-aos-duration="3000" onSubmit = {addEnquiry}>
								<Row className="mb-3">
									<Form.Group className="col-lg-6 col-sm-12" controlId="formGridFirst">
										<Form.Label>First Name</Form.Label>
										<Form.Control type="text" name="firstName" value={enquiryDetail.firstName} onChange={(e)=>{changeHandler(e)}}/>
										{enquiryDetail['errors']['firstName']&& (<p> <small style={{color:"red"}}>*{enquiryDetail['errors']['firstName']}</small>  </p>)}
									</Form.Group>

									<Form.Group className="col-lg-6 col-sm-12" controlId="formGridSecond">
										<Form.Label>last Name</Form.Label>
										<Form.Control type="text" name="lastName" value={enquiryDetail.lastName} onChange={(e)=>{changeHandler(e)}}/>
										{enquiryDetail['errors']['lastName']&& (<p> <small style={{color:"red"}}>*{enquiryDetail['errors']['lastName']}</small>  </p>)}
									</Form.Group>
								</Row>

								<Row>
									<Form.Group className="mb-3 col-lg-6 col-sm-12" controlId="formGridAddress1">
										<Form.Label>Address</Form.Label>
										<Form.Control type="text" name="address" value={enquiryDetail.address} onChange={(e)=>{changeHandler(e)}}/>
										{enquiryDetail['errors']['address']&& (<p> <small style={{color:"red"}}>*{enquiryDetail['errors']['address']}</small>  </p>)}
									</Form.Group>
									<Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
										<Form.Label>Contact Number</Form.Label>
										<Form.Control type="text" name="contact"  maxLength="10" value={enquiryDetail.contact} onChange={(e)=>{changeHandler(e)}} />
										{enquiryDetail['errors']['contact']&& (<p> <small style={{color:"red"}}>*{enquiryDetail['errors']['contact']}</small>  </p>)}
									</Form.Group>
								</Row>

								<Form.Group className="mb-3" controlId="formGridAddress2">
									<Form.Label>Email Address</Form.Label>
									<Form.Control type="email" name="emailAddress"  value={enquiryDetail.emailAddress} onChange={(e)=>{changeHandler(e)}}/>
									{enquiryDetail['errors']['emailAddress']&& (<p> <small style={{color:"red"}}>*{enquiryDetail['errors']['emailAddress']}</small>  </p>)}
								</Form.Group>
								<Form.Group className="mb-3" controlId="formGridAddress2">
									<Form.Label>Message</Form.Label>
									<Form.Control as="textarea" rows={6} name="enquiry" value={enquiryDetail.enquiry} onChange={(e)=>{changeHandler(e)}}/>
									{enquiryDetail['errors']['enquiry']&& (<p> <small style={{color:"red"}}>*{enquiryDetail['errors']['enquiry']}</small>  </p>)}
								</Form.Group>
								<div className="text-center">
									<Button className="btn-submit justify-content-center" type="submit" name="submitEnquiry" disabled={isLoading}								
									>
										{isLoading ? 'Submitting…' : 'Submit'}</Button>
								</div>
				
							</Form>

						</Col>
					</Row>
				</Container>
			</Container>

		</>
	)
}

export default Home

