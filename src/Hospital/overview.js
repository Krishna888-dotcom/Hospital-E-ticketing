import React,{useState,useEffect} from 'react'
import {Row,Col,Container,Table,Card} from 'react-bootstrap'
import useOverview from './useOverview'
import Skeleton from '../common/Skeleton'
import Chart from 'chart.js/auto';
let hospitalChart 
let hospitalChart2
let hospitalChart3 


const Overview = (props) => {
    let {} = props
    const {chartHospital,hospitals,totalHospitals,chartUser,users,totalUsers,revenueChart,totalRevenue,loading} = useOverview();

    //effect goes here
    useEffect(()=>{
        if(Object.keys(chartHospital).length > 0)
        {
            setTimeout(()=>{
                let hospitalChartArea = document.querySelector('#overallHospital').getContext('2d');
                const data = {
                    labels:Object.keys(chartHospital),
                    datasets:[
                        {
                          label: "Registered Hospitals",
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
                          data:Object.values(chartHospital),
                          spanGaps: false
    
                        }
                    ]
                }
                try
                {
                    hospitalChart = new Chart(hospitalChartArea,{
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
                        hospitalChart = new Chart(hospitalChartArea,{
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
                    catch(err1){}
                }
               
            },1000)
           
        }
    },[JSON.stringify(chartHospital)])

    //user graph
    useEffect(()=>{
        if(chartUser && Object.keys(chartUser).length > 0)
        {
            setTimeout(()=>{
                let hospitalChartArea = document.querySelector('#overallUser').getContext('2d');
                const data = {
                    labels:Object.keys(chartUser),
                    datasets:[
                        {
                          label: "Users Enrolled",
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
                          data:Object.values(chartUser),
                          spanGaps: false
    
                        }
                    ]
                }

                try
                {
                    hospitalChart2 = new Chart(hospitalChartArea,{
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
                        hospitalChart2.destroy();
                        hospitalChart2 = new Chart(hospitalChartArea,{
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
    },[JSON.stringify(chartUser)])

       //revenue graph
       useEffect(()=>{
        if(revenueChart && Object.keys(revenueChart).length > 0)
        {
            setTimeout(()=>{
                let hospitalChartArea = document.querySelector('#overallRevenue').getContext('2d');
                const data = {
                    labels:Object.keys(revenueChart),
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
                          data:Object.values(revenueChart),
                          spanGaps: false
    
                        }
                    ]
                }
                
                try
                {
                    hospitalChart3 = new Chart(hospitalChartArea,{
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
                catch(err) {
                    try
                    {
                        hospitalChart3.destroy();
                        hospitalChart3 = new Chart(hospitalChartArea,{
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
    },[JSON.stringify(revenueChart)])

    return (
        <React.Fragment>
        {
            loading == true?
            (
                <Skeleton/>
            )
            :
            (
                    <div className="container">
                    <p style={{fontSize:"25px",color:"black",fontWeight:"bolder"}}>Overview</p>
                    <Row>
                        <Col lg={4} md={12} xs={12}>
                            <div className="card" style={{margin:"10px",width:"350px",height:'200px',background:'#4b1cac',boxShadow:"0px 0px 15px rgba(0,0,0,0.6)"}}>
                                <div className="card-body">
                                    <Card.Title style={{color:"white",fontSize:"28px",marginBottom:"0px",fontWeight:"bolder"}}> Total Hospitals </Card.Title>
                                    <p style={{color:"white",fontSize:"34px",fontWeight:"bolder",marginLeft:"10px"}}> {totalHospitals} </p>
                                </div>
                                <div style={{position:"relative",height:"110px",width:"350px",position:"relative",top:"-40px"}}>
                                    <canvas id="overallHospital"></canvas>
                                </div>
                            </div>

                        </Col>
                        <Col lg={4} md={12} xs={12}>
                        <div className="card" style={{margin:"10px",width:"350px",height:'200px',background:'#c1549c',boxShadow:"0px 0px 15px rgba(0,0,0,0.6)"}}>
                                <div className="card-body">
                                    <Card.Title style={{color:"white",fontSize:"28px",marginBottom:"0px",fontWeight:"bolder"}}> Total Users </Card.Title>
                                    <p style={{color:"white",fontSize:"34px",fontWeight:"bolder",marginLeft:"10px"}}> {totalUsers} </p>
                                </div>
                                <div style={{position:"relative",height:"110px",width:"350px",position:"relative",top:"-40px"}}>
                                    <canvas id="overallUser"></canvas>
                                </div>
                            </div>
                            
                        </Col>
                        <Col lg={4} md={12} xs={12}>
                        <div className="card" style={{margin:"10px",width:"350px",height:'200px',background:'#A88EEC',boxShadow:"0px 0px 15px rgba(0,0,0,0.6)"}}>
                                <div className="card-body">
                                    <Card.Title style={{color:"white",fontSize:"28px",marginBottom:"0px",fontWeight:"bolder"}}> Revenue </Card.Title>
                                    <p style={{color:"white",fontSize:"34px",fontWeight:"bolder",marginLeft:"10px"}}> Rs {totalRevenue} </p>
                                </div>
                                <div style={{position:"relative",height:"110px",width:"350px",position:"relative",top:"-40px"}}>
                                    <canvas id="overallRevenue"></canvas>
                                </div>
                            </div>
                            
                        </Col>
                    </Row>
                    <p style={{fontSize:"25px",color:"Black",fontWeight:"bolder"}}>Hospitals</p>
                    {
                        hospitals &&(
                        hospitals.length > 0?
                        (
                            <Table bordered hover responsive className="table__items w-100"> 
                                <thead>
                                    <tr className="text-center">
                                        <th> S.N </th>
                                        <th>Name</th>
                                        <th> Username </th>
                                        <th> Email </th>
                                        <th>Address</th> 
                                        
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        hospitals.map((val,i)=>{
                                            return (
                                                <tr className="text-center">
                                                    <td style={{fontWeight:"bolder"}}> {i+1} </td>
                                                    <td> {val.hospitalName} </td>
                                                    <td> {val.userName} </td>
                                                    <td> {val.emailAddress} </td>
                                                    <td> {val.location} </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                            
                            </Table>
                        ):
                        (
                            <p className="text-center" style={{fontSize:"22px",color:"black"}}> No Hospitals to show. </p>
                        )
                        )
                    }
                   
                    <p style={{fontSize:"25px",color:"Black",fontWeight:"bolder"}}>Users</p>
                    {
                        users&&
                        (
                        users.length > 0?
                        (
                            <Table bordered hover responsive className="table__items w-100"> 
                                <thead>
                                    <tr className="text-center">
                                        <th> S.N </th>
                                        <th>Name</th>
                                        <th> Phone </th>
                                        <th> Email </th>
                                        <th> Username </th>
                                        <th>Address</th> 
                                        
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        users.map((val,i)=>{
                                            return (
                                                <tr className="text-center">
                                                    <td style={{fontWeight:"bolder"}}> {i+1} </td>
                                                    <td> {val.firstName} {val.lastName} </td>
                                                    <td> {val.phoneNumber} </td>
                                                    <td> {val.email} </td>
                                                    <td> {val.userName} </td>
                                                    <td> {val.address} </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            
                            </Table>
                        ):
                        (
                            <p className="text-center" style={{fontSize:"22px",color:"black"}}> No Users to show. </p>
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
