import React,{useState,useEffect} from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import {useToasts} from 'react-toast-notifications';
import useLoader from '../common/useLoader'
import Skeleton from '../common/Skeleton'
import {BiSearchAlt} from 'react-icons/bi'
import home_image from '../assets/logo/home_image.png'
import {Link as ScrollLink} from 'react-scroll'
import {Link} from 'react-router-dom'


const Hospital = (props) => {
    let{} = props;
    let {addToast} = useToasts();
    let {skeletonLoading,skeletonHandler} = useLoader();
    let token = sessionStorage.getItem('token')
    let [search,setSearch] = useState("");

    //state goes here
    let [hospitals,setHospitals] = useState([]);
    let [todayFacility,setFacility] = useState([]);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${sessionStorage.getItem('token')}`
            }
        }
    })

    //effect goes here
    useEffect(()=>{
        skeletonHandler(true)
        axios.get(process.env.REACT_APP_URL+"fetchTicketHospitals",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setHospitals(
                    response.data.data
                )
                setFacility(
                    response.data.hospitalToday
                )
            }
            else
            {
                setHospitals([])
                setFacility([])
            }
            skeletonHandler(false)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

    //handlers goes here
    const buyTicket = (e,id)=>{
        if(todayFacility.includes(id))
        {
            window.location.href = `/buyticket/${id}`
        }
        else
        {
            addToast("Tickets for the selected hospital is closed for today.",{
                "appearance":"error",
                "autoDismiss":true
            })
        }
    }

    const searchHandler = (e)=>{
        setSearch(e.target.value)
    }

    

    //content builder
    let filtered = hospitals.filter((val)=>{return val.hospitalName.toLowerCase().trim().startsWith(search.toLowerCase().trim()) || val.location.toLowerCase().trim().startsWith(search.toLowerCase().trim())})
    

    return (
        <React.Fragment>
            <div className="container-fluid mt-5">
                <div className="" style={{height:"70vh"}}>
                <Container fluid>
                
                <Row>
                    <Col lg={1}></Col>
                    <Col lg={5} className="pt-5">
                        <h2  style={{fontWeight:"bold",color:"black"}}>We Provide tickets from</h2>
                        <h2  style={{color:"black",fontWeight:"100"}}>Variety of hospitals for your service.</h2>
                        <p className="pt-3 text-justify">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                            sed diam nonumy eirmod tempor invidunt ut labore et
                            dolore magna aliquyam erat, sed diam voluptua. At
                            vero eos.</p>

                        <ScrollLink className="btn btn__Add w-25 btn-md m-2" to="hospitaldata" name="myBtn" smooth={true} duration={500}> Our Hospitals </ScrollLink>    
                        <Link className="btn btn__Add3 w-25 btn-md m-2" to="/" name="myBtn"> Read more </Link>    

                    </Col>
 
                    <Col lg={5} >
                        <img src={home_image} className="w-100"></img>
                    </Col>
 
                   
                </Row>
 
            </Container>
                </div>
                <h5 className="text-center mt-2 txt__secondary mb-3" style={{fontWeight:"bolder",fontSize:"22px"}} id="hospitaldata"> OUR HOSPITALS </h5>
                <div className="border"></div>
                <Container className="mb-2">
                    <Row>
                        <Col lg={4} className="d-none d-md-none d-lg-block"></Col>
                        <Col lg={4} md={12} xs={12}>
                            <form method = "post">
                                <div className="form-group">
                                <div className="input-group">
                
                                    <input type="text" className="form-control" name="search" onChange={(event)=>{searchHandler(event)}} placeholder="Search hospitals..." style={{height:"40px"}}/>
                                    <span className="icon-inside"><BiSearchAlt style={{color:"#4b1cac",fontSize:"25px"}}/></span>
                                </div>
                                    </div>
                            </form>
                        </Col>
                        <Col lg={4} className="d-none d-md-none d-lg-block"></Col>
                    </Row>
                </Container>

                {
                   skeletonLoading == true?
                   (
                       <Skeleton/>
                   ):
                   (
                       filtered.length > 0?
                       (
                           <>
                            <p style={{float:"left",marginLeft:"130px"}}> <small style={{fontWeight:"bolder",color:"black"}}> {filtered.length} hospitals. </small> </p>
                            <Container style={{clear:"both"}}>
                                <Row>
                                {
                                    filtered.map((val,i)=>{
                                        return (
                                            <Col lg={4} md={6} xs={12} className='mb-4'>
                                                <div className="card hospitalCard" onClick={(e)=>{buyTicket(e,val._id)}}>
                                                    <div className="img__div">
                                                        <img src={`${process.env.REACT_APP_URL}${val.hospitalImage}`} className="card-img-top" alt="logo" style={{height:'300px',width:'100%',borderRadius:"50px 0px 0px 0px"}}/>
                                                    </div>
                                                    <div class="card-body">
                                                        <h5 className="card-title text-center txt__secondary" style={{fontWeight:'bolder',height:"50px"}}>{val.hospitalName}</h5>
                                                       <p className="text-justify mt-4 mb-4" style={{color:"black"}}> {val.description.slice(0,180)}........ </p>
                                                       <div className="text-center">
                                                            <button type="button" className="btn btn__Add w-50 btn-md mb-3" style={{boxShadow: '2px 2px 6px #424242'}}>Buy Ticket</button>
                                                       </div>
                                                        
                                                    </div>
                                                
                                                </div>
                                            </Col>
                                        )
                                    })
                                }

                                        
                                <p style={{color:'grey',fontWeight:'400'}}> Showing {filtered.length} of <strong>{filtered.length}</strong> </p>
                                          
                                          
                                   
                                </Row>
                            </Container>
                           </>
                       ):
                       (
                           <p className="text-center txt__primary mt-2" style={{fontWeight:"bolder",fontSize:"18px"}}> No Hospitals to fetch... </p>
                       )
                   )
                }
                
            </div>
            
        </React.Fragment>
    )
}

export default Hospital
