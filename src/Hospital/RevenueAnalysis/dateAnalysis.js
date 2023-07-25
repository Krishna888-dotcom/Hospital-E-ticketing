import React,{useState,useEffect} from 'react';
import axios from 'axios';
import useCommon from '../../common/useCommon';
import {Table,Row,Col} from 'react-bootstrap'
import Skeleton from '../../common/Skeleton';
import useLoader from '../../common/useLoader'
import Chart from 'chart.js/auto';
let hospitalChart;

const DateAnalysis = (props) => {
    const {hospital} = props;
    const {auth,getFormattedToday} = useCommon();
    const {skeletonLoading,skeletonHandler} = useLoader();
    
    //state goes here
    let [date,setDate] = useState(getFormattedToday(new Date()));
    let [dateAnalysis,setDateAnalysis] = useState({});
    let [dateChart,setDateChart] = useState({})
    let [startDate,setStartDate] = useState(getFormattedToday(new Date()))
    let [hospitalUname,setHospitalUname] = useState("")
    
    
    //effect goes here
    useEffect(()=>{
        if(hospital != "")
        {
            skeletonHandler(true)
            axios.post(process.env.REACT_APP_URL+"revenueDate",{"hospitalId":hospital,"date":date},auth.config)
            .then((response)=>{
                console.log(response)
                if(response.data.success == true)
                {
                    setDateAnalysis(
                        response.data.data
                    );
                    setDateChart(
                        response.data.chartData
                    );
                    setStartDate(
                        response.data.startDate
                    )
                    setHospitalUname(
                        response.data.hospitalUsername
                    )
                }
                else
                {
                    setDateAnalysis({});
                    setDateChart({});
                    setStartDate(response.data.startDate)
                    setHospitalUname("")
                }
                skeletonHandler(false)
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },[hospital,date])

    useEffect(()=>{
       
        if(dateChart && Object.keys(dateChart).length > 0 && hospitalUname == hospital)
        {
            setTimeout(()=>{
                let chartArea = document.querySelector('#dateChart').getContext('2d');
                const data = {
                    labels:Object.keys(dateChart),
                    datasets:[
                        {
                          label: "Business Point",
                          fill: true,
                          lineTension: 0.1,
                          borderColor: "black",
                          borderCapStyle: 'butt',
                          borderDash: [],
                          borderDashOffset: 0.0,
                          borderJoinStyle: 'miter',
                          pointBorderColor: "white",
                          pointBackgroundColor: "black",
                          pointBorderWidth: 1,
                          pointHoverRadius: 8,
                          pointHoverBackgroundColor: "brown",
                          pointHoverBorderColor: "yellow",
                          pointHoverBorderWidth: 2,
                          pointRadius: 4,
                          pointHitRadius: 10,
                          // notice the gap in the data and the spanGaps: false
                          data:Object.values(dateChart),
                          spanGaps: false
    
                        }
                    ]
                }
    
                try{
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
                                    display: true
                                },
                                y: {
                                    display: true,
                                    beginAtZero:true
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
                                        display: true
                                    
                                    },
                                    y: {
                                        display: true,
                                        beginAtZero:true
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
    },[JSON.stringify(dateChart),hospital,date,hospitalUname])

    const loadRows = ()=>{
        let content = [];

        if(Object.keys(dateAnalysis).length > 0)
        {
            for(var i in dateAnalysis)
            {
                content.push(
                    <tr className="text-center">
                        <td> {i}  </td>
                        <td> {dateAnalysis[i][0][0]} </td>
                        <td> Rs {dateAnalysis[i][0][1]} </td>
                        <td> {dateAnalysis[i][1][0]} </td>
                        <td> Rs {dateAnalysis[i][1][1]} </td>
                        <td> {dateAnalysis[i][2]}% </td>
                    </tr>
                )
            }
        }
        else
        {
            content.push(
                <p className="text-center" style={{color:"grey",fontSize:"20px"}}> No Records  </p>
            )
        }

        return content;
    }
   
    
    return (
        <React.Fragment>
            <div style={{marginTop:"10px"}}>
                <Row>
                    <Col lg={4} className="d-none d-md-none d-lg-block"></Col>
                    <Col lg={4}>
                        <form method="post">
                            <div className="form-group">
                                <input type="date" className="form-control" max={getFormattedToday(new Date())} min={startDate} value={date} onChange={(e)=>{setDate(e.target.value); setDateChart({})}}/>
                            </div>
                        </form>
                    </Col>
                    <Col lg={4} className="d-none d-md-none d-lg-block"></Col>
                </Row>
                <p className="text-center mt-4" style={{color:"black",fontWeight:"bolder"}}> Analysis of {date}  </p>
               
               {
                   skeletonLoading == true?
                   (
                        <Skeleton/>
                   ):
                   (
                       <>
                       {
                            dateChart &&
                            (
                                <div class="card">
                                    <div class="card-body">
                                         <canvas id="dateChart"></canvas>               
                                    </div>
                                </div>
                            )
                        }
                

                        {
                            dateAnalysis &&
                            (
                                <Table bordered hover responsive className="table__items w-100 mt-2">
                                    <thead>
                                        <tr className="text-center">
                                            <th> Shift </th>
                                            <th> Tickets Sold </th>
                                            <th> Tickets Unsold </th>
                                            <th> Revenue Collected </th>
                                            <th> Revenue Remained </th>
                                            <th> Business Analysis </th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            loadRows().map((val)=>{
                                                return (
                                                    val
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            )
                        }
                       </>
                   )
               }
               
            </div>
        </React.Fragment>
    )
}

export default DateAnalysis;
