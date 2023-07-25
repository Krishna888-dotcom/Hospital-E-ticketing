import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Container,Row,Col,Card,Table} from 'react-bootstrap';
import useCommon from '../common/useCommon'
import Skeleton from '../common/Skeleton';
import useLoader from '../common/useLoader'
import Chart from 'chart.js/auto';
let hospitalChart;
let hospitalChart1;


const Overview = (props) => {
    const {} = props;
    const {auth} = useCommon();
    const {skeletonLoading,skeletonHandler} = useLoader();
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    //state goes here
    let [soldTickets,setSoldTickets] = useState([]);
    let [moneyGraph,setMoneyGraph] = useState({});
    let [ticketsGraph,setTicketGraph] = useState({});
    let [ticketsAndRevenue,setTicketsAndRevenue] = useState([])


    //effect goes here
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"soldTickets",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setSoldTickets(
                    response.data.limitData
                )
            }
            else
            {
                setSoldTickets([])
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        skeletonHandler(true);
        axios.get(process.env.REACT_APP_URL+"revenueMonth/"+user.userName,auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setMoneyGraph(
                    response.data.moneyGraph
                )
                setTicketGraph(
                    response.data.soldTicketGraph
                )
                setTicketsAndRevenue(
                    response.data.total
                )
            }
            else
            {
                setMoneyGraph({})
                setTicketGraph({})
                setTicketsAndRevenue([])
            }
            skeletonHandler(false);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])


    useEffect(()=>{
        if(moneyGraph && Object.keys(moneyGraph).length > 0)
        {
           
            setTimeout(()=>{
                let chartArea = document.querySelector('#moneyGraph').getContext('2d')
                const data = {
                    labels:Object.keys(moneyGraph),
                    datasets:[
                        {
                          label: "Revenue Collected Rs",
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
                          data:Object.values(moneyGraph),
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
                    try
                    {
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
                    catch(err2)
                    {

                    }
                }
    
                
            },1000)
        }
    },[JSON.stringify(moneyGraph)])


    
    useEffect(()=>{
        if(ticketsGraph && Object.keys(ticketsGraph).length > 0)
        {
           
            setTimeout(()=>{
                let chartArea = document.querySelector('#ticketGraph').getContext('2d')
                const data = {
                    labels:Object.keys(ticketsGraph),
                    datasets:[
                        {
                          label: "Tickets Sold",
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
                          data:Object.values(ticketsGraph),
                          spanGaps: false
    
                        }
                    ]
                }

                try
                {
                    hospitalChart1 = new Chart(chartArea,{
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
                        hospitalChart1.destroy();
                        hospitalChart1 = new Chart(chartArea,{
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
    },[JSON.stringify(ticketsGraph)])
    
    return (
        <React.Fragment>
            {
                skeletonLoading == true?
                (
                    <Skeleton/>
                ):
                (
                    <div className="container">
                    <p style={{fontSize:"25px",color:"black",fontWeight:"bolder"}}>Overview</p>
                    <Row>
                        <Col lg={4} md={12} xs={12}>
                            <div className="card" style={{margin:"10px",width:"350px",height:'200px',background:'#4b1cac',boxShadow:"0px 0px 15px rgba(0,0,0,0.6)"}}>
                                <div className="card-body">
                                    <Card.Title style={{color:"white",fontSize:"28px",marginBottom:"0px",fontWeight:"bolder"}}> Total Tickets </Card.Title>
                                    <p style={{color:"white",fontSize:"34px",fontWeight:"bolder",marginLeft:"10px"}}> {ticketsAndRevenue[2]} </p>
                                </div>
                                <div style={{position:"relative",height:"110px",width:"350px",position:"relative",top:"-40px"}}>
                                    <canvas id="ticketGraph"></canvas>
                                </div>
                            </div>

                        </Col>
                        <Col lg={4} md={12} xs={12}>
                        <div className="card" style={{margin:"10px",width:"350px",height:'200px',background:'#c1549c',boxShadow:"0px 0px 15px rgba(0,0,0,0.6)"}}>
                                <div className="card-body">
                                    <Card.Title style={{color:"white",fontSize:"28px",marginBottom:"0px",fontWeight:"bolder"}}> Revenue </Card.Title>
                                    <p style={{color:"white",fontSize:"34px",fontWeight:"bolder",marginLeft:"10px"}}> Rs {ticketsAndRevenue[0]} </p>
                                </div>
                                <div style={{position:"relative",height:"110px",width:"350px",position:"relative",top:"-40px"}}>
                                    <canvas id="moneyGraph"></canvas>
                                </div>
                            </div>
                            
                        </Col>
                       
                    </Row>
                    <p style={{fontSize:"25px",color:"black",fontWeight:"bolder"}}>Issued Tickets</p>
                    {
                        soldTickets &&(
                        soldTickets.length > 0?
                        (
                            <Table bordered hover responsive className="table__items w-100"> 
                                <thead>
                                    <tr className="text-center">
                                        <th> S.N </th>
                                        <th>Patient Name</th>
                                        <th> Phone </th>
                                        <th> Email </th>
                                        <th>Address</th> 
                                        <th> Shift </th>
                                        <th> Date </th>  
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        soldTickets.map((val,i)=>{
                                            return (
                                                <tr className="text-center">
                                                    <td style={{fontWeight:"bolder"}}> {i+1} </td>
                                                    <td> {val.patientName} </td>
                                                    <td> {val.buyerId.phoneNumber} </td>
                                                    <td> {val.buyerId.email} </td>
                                                    <td> {val.address} </td>
                                                    <td> {val.ticketId.shift} </td>
                                                    <td> {val.ticketId.date2} </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                            
                            </Table>
                        ):
                        (
                            <p className="text-center" style={{fontSize:"22px",color:"black"}}> No Issued Tickets To Show. </p>
                        )
                        )
                    }
                   
                </div>
                )
            }
           
        </React.Fragment>
    )
}

export default Overview
