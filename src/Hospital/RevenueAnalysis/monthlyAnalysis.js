import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {Container,Row,Col,Card,Table} from 'react-bootstrap';
import Chart from 'chart.js/auto';
import Skeleton from '../../common/Skeleton';
import useLoader from '../../common/useLoader'
import useCommon from '../../common/useCommon';
let hospitalChart
let month = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const MonthlyAnalysis = (props) => {
    const {hospital} = props;
    const {auth,getFormattedToday} = useCommon();
    const {skeletonLoading,skeletonHandler} = useLoader();

     //state goes here
     let [monthData,setMonthData] = useState([]);
     let [monthChart,setMonthChart] = useState({});
     let [moneyAndRevenue,setMoneyAndRevenue] = useState([]);
     let [monthSelection,setMonthSelection] = useState("");

      //effect goes here
    useEffect(()=>{
        if(hospital != "")
        {

            skeletonHandler(true)
            setMonthSelection("")
            axios.get(process.env.REACT_APP_URL+"revenueMonth/"+hospital,auth.config)
            .then((response)=>{
                if(response.data.success == true)
                {
                    setMonthData(
                        response.data.data
                    )
                    setMonthChart(
                        response.data.chartData
                    )
                    setMoneyAndRevenue(
                        response.data.total
                    )
                }
                else
                {
                    setMonthData([]);
                    setMonthChart({});
                    setMoneyAndRevenue([]);
                }
                skeletonHandler(false)
            })
            .catch((err)=>{
                console.log(err);
            })
        }
       
    },[hospital])

    let filtered = monthData.filter((val)=>{return Object.keys(val)[0] == monthSelection})

    const loadNext = (data)=>{
        let content = [];

        for(var i in data)
        {
            content.push(
                <tr className="text-center">
                    <th> {i} </th>
                    <td> {data[i][0][0]} </td>
                    <td> {data[i][1][0]} </td>
                    <td> Rs {data[i][0][1]} </td>
                    <td> Rs {data[i][1][1]} </td>
                    <td> {data[i][2]}% </td>
                </tr>
            )
        }

        return content;
    }


    const loadContent = ()=>{
        let content = [];

        //although it gives only one key
        for(var i of filtered)
        {
            for(var j in i)
            content.push(
              <Col lg={12}> 
                <Table bordered hover responsive className="table__items w-100 mt-2">
                    <thead>
                        <tr className="text-center">
                            <td colSpan="6"> 
                                {j}
                            </td>
                        </tr>
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
                            loadNext(i[j]).map((val)=>{
                                return (
                                    val
                                )
                            })
                        }
                    </tbody>

                </Table>
                </Col>   
            )
        }

        return content;
    }

    
    useEffect(()=>{
       
        if(monthChart && Object.keys(monthChart).length > 0 && monthData[0] == hospital)
        {
            setTimeout(()=>{
                let chartArea = document.querySelector('#monthChart').getContext('2d');
                const data = {
                    labels:Object.keys(monthChart),
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
                          data:Object.values(monthChart),
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
    },[JSON.stringify(monthChart),hospital,monthData[0]])

    const changeHandler = (e)=>{
        setMonthSelection(
            e.target.value
        )
    }
    
    
     return (
        <React.Fragment>
             <p className="text-center mt-4" style={{color:"black",fontWeight:"bolder"}}> Monthly Analysis  </p>
                {
                    skeletonLoading == true?
                    (
                        <Skeleton/>
                    ):
                    (
                        <>
                        <p> <strong> Total Collection: </strong>  Rs {moneyAndRevenue[0]} of Rs {moneyAndRevenue[0]+moneyAndRevenue[1]} </p>
                            {
                                monthChart&&
                                (
                                    <div class="card">
                                    <div class="card-body">
                                         <canvas id="monthChart"></canvas>               
                                    </div>
                                </div>
                                )
                            }
                            <Row className="mt-4">
                                <Col lg={4} className="d-none d-md-none d-lg-block"></Col>
                                <Col lg={4}>
                                    <form method = "post">
                                        <div className="form-group">
                                            <label style={{color:"black",fontWeight:"bold"}}> Select Month  </label>
                                            <select className="form-select mt-3 mb-3" onChange={(e)=>{changeHandler(e)}} name="daySelection">
                                                <option value="">Select Month</option>
                                                {
                                                    month.map((val)=>{
                                                        return (
                                                            <option value = {val}> {val} </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </form>
                                </Col>
                                <Col lg={4} className="d-none d-md-none d-lg-block"></Col>
                            </Row>               

                            {
                                filtered.length > 0?
                                (
                                    <Row>
                                    {
                                        loadContent().map((val)=>{
                                            return (
                                                val
                                            )
                                        })
                                    }
                                </Row>
                                ):
                                (
                                    <p className="text-center" style={{color:"black",fontWeight:"bolder"}}> Choose Month To See Calculation According To Month.  </p>
                                )

                            }  
                        </>
                    )

                }    
        </React.Fragment>
    )
}

export default MonthlyAnalysis
