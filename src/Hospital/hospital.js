import React,{useState,useEffect} from 'react'
import {Container,Col,Row,Card,Table,modal} from 'react-bootstrap'
import axios from 'axios';
import {Link} from 'react-router-dom';
import {BiSearchAlt} from 'react-icons/bi'
import AddHospital  from './addHospital';
import ReactPaginate from 'react-paginate';
import EditHospital from './editHospital'
import Chart from 'chart.js/auto';
import Skeleton from '../common/Skeleton';
import useLoader from '../common/useLoader'
let hospitalChart;
let hospitalGraph;

function Hospital(props) {
    let{}=props
    let {skeletonLoading,skeletonHandler} = useLoader();
    let user = JSON.parse(sessionStorage.getItem('user'))

    //state goes here
    let [hospitals,setHospitals] = useState([]);
    let [search,setSearch] = useState("");
    let [pageSurfed,setSurfed] = useState(0);
    let [overallJoined,setOverallHospitals] = useState(0);
    let [dateAndCount,setDateAndCount] = useState({});
    let [currentMonth,setMonth] = useState("");
    let [overallAnalysis,setAnalysis] = useState({});
    let [startedFrom,setStartedFrom] = useState("");
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${sessionStorage.getItem("token")}`
            }
        }
    })

    //variables goes here
    let singlePage = 7;
    let rowChecked = singlePage * pageSurfed;


    //effect goes here
    useEffect(()=>{
        skeletonHandler(true);
        axios.get(process.env.REACT_APP_URL+"fetchHospitals")
        .then((response)=>{
            if(response.data.success == true)
            {
                setHospitals(response.data.data)
            }
            else
            {
                setHospitals([])
            }
            skeletonHandler(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])


    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"monthlyHospitals",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setOverallHospitals(
                    response.data.overallJoined
                )
                setDateAndCount(
                    response.data.data
                )
                setMonth(
                    response.data.month
                )
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"getOverallHospitalsAnalysis",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setAnalysis(
                    response.data.data
                )
                setStartedFrom(
                    response.data.startDate
                );
            }
        })
    },[]);

    useEffect(()=>{
        if(dateAndCount && Object.keys(dateAndCount).length > 0)
        {
            setTimeout(()=>{
                let chartArea = document.querySelector("#newHospital").getContext('2d');
                const data = {
                    labels:Object.keys(dateAndCount),
                    datasets:[
                        {
                          label: "Registration Count",
                          fill: true,
                          lineTension: 0.1,
                          borderColor: "rgba(255,255,255,0.6)",
                          backgroundColor:"rgba(255,255,255,0.6)",
                          borderCapStyle: 'butt',
                          borderDash: [],
                          borderDashOffset: 1.0,
                          borderWidth:2,
                          borderJoinStyle: 'miter',
                          pointBorderColor: "white",
                          pointBackgroundColor: "rgba(255,255,255,0.6)",
                          pointBorderWidth: 0,
                          pointHoverRadius: 2,
                          pointHoverBackgroundColor: "blue",
                          pointHoverBorderColor: "yellow",
                          pointHoverBorderWidth: 2,
                          pointRadius: 3,
                          pointHitRadius: 3,
                          // notice the gap in the data and the spanGaps: false
                          data:Object.values(dateAndCount),
                          spanGaps: false,
    
                        }
                    ]
                }
                
               
                try
                {
                    hospitalGraph = new Chart(chartArea,{
                        type:"line",
                        data:data,
                        options:{
                            maintainAspectRatio:false,
                            responsive:true,
                            plugins: {
                                legend: {
                                display: false
                                }
                            },
                            scales:{
                                x: {
                                    display: false
                                },
                                y: {
                                    display: false
                                }
                            },
                            layout: {
                                padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                },
                            }
                        }
                        
                    })
            }
            catch(err)
            {
                try
                {
                    hospitalGraph.destroy();
                    hospitalGraph = new Chart(chartArea,{
                        type:"line",
                        data:data,
                        options:{
                            maintainAspectRatio:false,
                            responsive:true,
                            plugins: {
                                legend: {
                                display: false
                                }
                            },
                            scales:{
                                x: {
                                    display: false
                                },
                                y: {
                                    display: false
                                }
                            },
                            layout: {
                                padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                },
                            }
                        }
                        
                    })
                }
                catch(err2){}
                
            }
            },1000)
                
         
         
        }
    },[JSON.stringify(dateAndCount)])

    useEffect(()=>{
        
        if(overallAnalysis   && Object.keys(overallAnalysis).length > 0)
        {
            setTimeout(()=>{
                let chartArea = document.querySelector('#overallHospital').getContext('2d');   
                const data = {
                    labels:Object.keys(overallAnalysis),
                    datasets:[
                        {
                          label: "Registration Count",
                          fill: true,
                          lineTension: 0.1,
                          borderColor: "rgba(255,255,255,0.6)",
                          backgroundColor:"rgba(255,255,255,0.6)",
                          borderCapStyle: 'butt',
                          borderDash: [],
                          borderDashOffset: 1.0,
                          borderWidth:2,
                          borderJoinStyle: 'miter',
                          pointBorderColor: "white",
                          pointBackgroundColor: "rgba(255,255,255,0.6)",
                          pointBorderWidth: 0,
                          pointHoverRadius: 2,
                          pointHoverBackgroundColor: "blue",
                          pointHoverBorderColor: "yellow",
                          pointHoverBorderWidth: 2,
                          pointRadius: 3,
                          pointHitRadius: 3,
                          // notice the gap in the data and the spanGaps: false
                          data:Object.values(overallAnalysis),
                          spanGaps: false
    
                        }
                    ]
                }
    
               
    
    
          
                try
                {
                    hospitalChart = new Chart(chartArea,{
                        type:"line",
                        data:data,
                        options:{
                            maintainAspectRatio:false,
                            responsive:true,
                            plugins: {
                                legend: {
                                display: false
                                }
                            },
                            scales:{
                                x: {
                                    display: false
                                },
                                y: {
                                    display: false
                                }
                            },
                            layout: {
                                padding: {
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                },
                            }
                        }
                        
                    })
                }
                catch(err)
                {
                    try{
                        hospitalChart.destroy();
                        hospitalChart = new Chart(chartArea,{
                            type:"line",
                            data:data,
                            options:{
                                maintainAspectRatio:false,
                                responsive:true,
                                plugins: {
                                    legend: {
                                    display: false
                                    }
                                },
                                scales:{
                                    x: {
                                        display: false
                                    },
                                    y: {
                                        display: false
                                    }
                                },
                                layout: {
                                    padding: {
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    },
                                }
                            }
                            
                        })
                    }
                    catch(err2){}
                }
            },1000)
           
            
            
        }
    },[JSON.stringify(overallAnalysis)])

    //handlers and supporters goes here
    const searchHandler = (e)=>{
        setSurfed(
            0
        )
        setSearch(
            e.target.value
        )
    }

    const changePage = ({selected})=>{
       
        setSurfed(
            selected
        )
    }


    let filtered = hospitals.filter((val)=>{return val.hospitalName.toLowerCase().trim().startsWith(search.toLowerCase().trim()) || val.emailAddress.toLowerCase().trim().startsWith(search.toLowerCase().trim()) || val.location.toLowerCase().trim().startsWith(search.toLowerCase().trim()) || val.mobileNumber.toLowerCase().trim().startsWith(search.toLowerCase().trim()) || val.hospitalCode == search})
    let pageDistribution = Math.ceil(filtered.length / singlePage);
    let content = filtered.slice(rowChecked,rowChecked+singlePage);
    
    
    return (
        <React.Fragment>
        {
            skeletonLoading == true?
            (
                <Skeleton
                    height={140}
                    width={300}
                />
            ):
            (
                <>
            <div className="container-fluid">
               <h5 style={{fontWeight:"bolder",fontSize:"23px",marginLeft:"10px"}}> Hospitals  </h5> 
            
          <div className="chart">
              <Row>
                <Col lg={4} md={12} xs={12}>
                   
                    <Card style={{margin:"10px",width:"350px",height:'200px',background:'#4b1cac', boxShadow:"0px 0px 15px rgba(0,0,0,0.6)"}}>
                        
                            <Card.Body>
                                
                                <Card.Title style={{color:"white",fontSize:"28px",marginBottom:"0px",fontWeight:"bolder"}}> Total Hospitals </Card.Title>
                                <p style={{color:"white",fontSize:"34px",fontWeight:"bolder",marginLeft:"15px"}}> {hospitals.length} </p>
                                
                            </Card.Body>
                            <div style={{position:"relative",height:"110px",width:"350px",position:"relative",top:"-40px"}}>
                                <canvas id="overallHospital"></canvas>
                            </div>
                            </Card>
                           
                    </Col>
                    <Col lg={4} md={12} xs={12}>
                  
                    <Card style={{margin:"10px",width:"350px",height:'200px',background:'#c1549c',boxShadow:"0px 0px 15px rgba(0,0,0,0.6)"}}>
                            
                            <Card.Body>
                                <p style={{float:"right",color:"white"}}> <small style={{fontWeight:"bold"}}> {currentMonth} </small> </p>
                                <Card.Title style={{color:"white",fontSize:"28px",marginBottom:"0px",fontWeight:"bolder"}}> New Hospitals </Card.Title>
                                <p style={{color:"white",fontSize:"34px",fontWeight:"bolder",marginLeft:"10px"}}> {overallJoined} </p>
                               
                                
                            </Card.Body>
                            <div style={{position:"relative",height:"110px",width:"350px",position:"relative",top:"-40px"}}>
                                <canvas id="newHospital"></canvas>
                            </div>
                            </Card>
                          
                    </Col>
              </Row>

          </div>

          
          
         

       
        {/* search layout */}
        <Row  className="mb-1 mt-3">
                <Col lg={1}></Col>
                <Col lg={9} md={12} xs={12}>
                    <form method = "post">
                    <div className="form-group searchBar">
                        <div class="input-group">

                        <input type="text" className="form-control" name="search" onChange={(event)=>{searchHandler(event)}} placeholder="Search hospitals..."/>
                        <span className="icon-inside"><BiSearchAlt style={{color:"grey",fontSize:"25px"}}/></span>
                    </div>
                    </div>
                    </form>
                </Col>
                <Col lg={1}>
                <div className ="add-btn">
                    <button type="button" className="btn btn-md w-0 Add" name="hopitaladd" data-bs-toggle="modal" data-bs-target="#hospital" > Add </button>
                    <AddHospital/>
                </div>
                </Col>
               
            </Row> 
       
        <Container fluid mx-auto className="mb-3" style={{clear:"both"}}>
                    <Row>
                        <h3 className="text-center mx-auto my-3" style={{color:"black"}}>Hospital Details</h3>
                        {
                            content.length > 0?
                            (
                                <>
                                   <p style={{float:"right"}} className="mb-0 mt-0 txt__secondary"> <small style={{fontWeight:"bolder"}}> {filtered.length} hospitals.  </small> </p>
                                    <Col style={{clear: 'both'}}>
                                        <Table bordered hover responsive className="table__items w-100"> 
                                            <thead>
                                                <tr className="text-center">
                                                    <th>S.N.</th>
                                                    <th> Hospital Name </th>
                                                    <th> Hospital Code </th>
                                                    <th>Username</th> 
                                                    <th>Email Address</th>
                                                    <th> Location </th>
                                                    <th>Mobile Number</th>
                                                    <th>Office Number</th>
                                                    <th>Contact Person Name</th>
                                                    <th>Designation</th>                                                                                                     
                                                    <th>Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               {
                                                   content.map((val)=>{
                                                       return(
                                                           <>
                                                           <tr className="text-center table__rows">
                                                                <td style={{fontWeight:"bolder"}}> {filtered.indexOf(val)+1}  </td>
                                                                <td> {val.hospitalName}  </td>
                                                                <td> {val.hospitalCode}  </td>
                                                                <td> {val.userName}  </td>
                                                                <td> {val.emailAddress}  </td>
                                                                <td> {val.location}  </td>
                                                                <td> {val.mobileNumber}  </td>
                                                                <td> {val.officeNumber}  </td>
                                                                <td> {val.personName}  </td>
                                                                <td> {val.designation} </td>
                                                                <td> 
                                                                    <button className="btn btn-success w-0 btn-md" type="button" data-bs-toggle="modal" data-bs-target={`#editHospital${val._id}`} name="update" style={{boxShadow:"2px 3px 3px rgba(0,0,0,0.6)"}}> 
                                                                    
                                                                        <i className="fas fa-pen"></i>
                                                                    
                                                                     </button>
                                                                
                                                                </td>
                                                               
                                                           </tr>
                                                           <EditHospital data={val} key={`edit${val._id}`}/>
                                                           </>
                                                       )
                                                   })
                                               }
                                            </tbody>
                                        </Table>
                                        {
                                            pageDistribution > rowChecked+1?
                                            (
                                                <p style={{color:'grey',fontWeight:'400'}}> Showing {(rowChecked+1)*singlePage} of <strong>{filtered.length}</strong> </p>
                                            ):
                                            (
                                                <p style={{color:'grey',fontWeight:'400'}}> Showing {filtered.length} of <strong>{filtered.length}</strong> </p>
                                            )
                                        }
                                       

                                        <ReactPaginate
                                                pageCount = {pageDistribution}
                                                previousLabel = "Previous"
                                                nextLabel = "Next"
                                                onPageChange = {changePage}
                                                containerClassName={"main"}
                                                previousLinkClassName={"prevStyle"}
                                                nextLinkClassName={"nextStyle"}
                                                disabledClassName={"disableButtons"}
                                                activeClassName={"pageActive"}
                                        />
          


                                    </Col>
                                    
                                </>
                            ):
                            (
                                <p className="text-center" style={{fontWeight:"bolder",color:"black"}}>  0 Hosptials Registered.  </p>
                            )
                        }
                  
                    </Row>
                </Container>
                </div>

        </> 
            )

        }
             
         
           
        </React.Fragment>
    )
}

export default Hospital
