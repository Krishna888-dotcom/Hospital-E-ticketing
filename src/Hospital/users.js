import React,{useState,useEffect} from 'react'
import { Row,Col,Table,Card } from 'react-bootstrap'
import {BiSearchAlt} from 'react-icons/bi'
import axios from 'axios';
import useLoader from '../common/useLoader'
import Skeleton from '../common/Skeleton'
import ReactPaginate from 'react-paginate'
import useCommon from '../common/useCommon'
import Chart from 'chart.js/auto';
let userChart;
let monthChart;

const Users = (props) => {
    let {} = props
    let {skeletonLoading,skeletonHandler} = useLoader(); 
    let {auth} = useCommon();
    
    //state goes here
    let [users,setUsers] = useState([]);
    let [currentPage,setCurrentPage] = useState(0);
    let [search,setSearch] = useState("");
    let [overallUsers,setOverallUsers] = useState(0);
    let [overallChart,setOverallChart] = useState({});
    let [usersMonth,setUsersMonth] = useState(0);
    let [currentMonth,setCurrentMonth] = useState("July,2021");
    let [monthChart,setMonthChart] = useState({});
    
    let singlePage = 7;
    let pageVisited = currentPage * singlePage;

    //effect goes here
    useEffect(()=>{
        skeletonHandler(true)
        axios.get(process.env.REACT_APP_URL+"fetchUsers")
        .then((response)=>{
            if(response.data.success == true)
            {
                setUsers(
                    response.data.data
                )
            }
            else
            {
                setUsers([])
            }
            skeletonHandler(false)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"getOverallUsers",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setOverallUsers(
                    response.data.overallUsers
                )
                setOverallChart(
                    response.data.userAndCount
                )
            }
            else
            {
                setOverallUsers(0);
                setOverallChart(
                    {}
                )
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"userInAMonth",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setUsersMonth(
                    response.data.totalUsers
                )
                setCurrentMonth(
                    response.data.ongoingMonth
                )
                setMonthChart(
                    response.data.data
                )
            }
            else
            {
                setUsersMonth(0);
                setCurrentMonth("July,2021");
                setMonthChart({});
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        
        if(overallChart   && Object.keys(overallChart).length > 0)
        {
            setTimeout(()=>{
                let chartArea = document.querySelector('#overallUsers').getContext('2d');   
                const data = {
                    labels:Object.keys(overallChart),
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
                          data:Object.values(overallChart),
                          spanGaps: false
    
                        }
                    ]
                }
    
               
    
    
          
                try
                {
                    userChart = new Chart(chartArea,{
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
                        userChart.destroy();
                        userChart = new Chart(chartArea,{
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
    },[JSON.stringify(overallChart)])


    useEffect(()=>{
        
        if(monthChart   && Object.keys(monthChart).length > 0)
        {
            setTimeout(()=>{
                let chartArea = document.querySelector('#monthChart').getContext('2d');   
                const data = {
                    labels:Object.keys(monthChart),
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
                          data:Object.values(monthChart),
                          spanGaps: false
    
                        }
                    ]
                }
    
               
    
    
          
                try
                {
                    monthChart = new Chart(chartArea,{
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
                        monthChart.destroy();
                        monthChart = new Chart(chartArea,{
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
    },[JSON.stringify(monthChart)])


    let filtered = users.filter((val)=>{
        return (
            val.firstName.toLowerCase().trim().startsWith(search.toLowerCase().trim())
            ||
            val.lastName.toLowerCase().trim().startsWith(search.toLowerCase().trim())
            ||
            val.userName.toLowerCase().trim().startsWith(search.toLowerCase().trim())
            ||
            val.email.toLowerCase().trim().startsWith(search.toLowerCase().trim())
            ||
            val.phoneNumber.toLowerCase().trim().startsWith(search.toLowerCase().trim())
        )
    })
    
    let totalPages = Math.ceil(filtered.length / singlePage);
    let content = filtered.slice(pageVisited,pageVisited+singlePage);

    //handler
    const changePage = ({selected})=>{
        setCurrentPage(
            selected
        )
    }

    const searchHandler = (e)=>{
        setCurrentPage(
            0
        )
        setSearch(
            e.target.value
        )
    }
    
    return (
        <React.Fragment>
            <div className="container-fluid">
                <p style={{fontWeight:"bolder",fontSize:"23px",marginLeft:"10px"}}> Users  </p>

            

           

            <div className="chart">
              <Row>
                <Col lg={4} md={12} xs={12}>
                   
                    <Card style={{margin:"10px",width:"350px",height:'200px',background:'#4b1cac', boxShadow:"0px 0px 15px rgba(0,0,0,0.6)"}}>
                        
                            <Card.Body>
                                    <Card.Title style={{color:"white",fontSize:"28px",marginBottom:"0px",fontWeight:"bolder"}}> Total Users </Card.Title>
                                    <p style={{color:"white",fontSize:"34px",fontWeight:"bolder",marginLeft:"10px"}}> {overallUsers} </p>     
                            </Card.Body>

                            <div style={{position:"relative",height:"110px",width:"350px",position:"relative",top:"-40px"}}>
                                <canvas id="overallUsers"></canvas>
                            </div>

                            
                    </Card>
                           
                    </Col>
                    <Col lg={4} md={12} xs={12}>
                  
                    <Card style={{margin:"10px",width:"350px",height:'200px',background:'#c1549c',boxShadow:"0px 0px 15px rgba(0,0,0,0.6)"}}>
                            
                            <Card.Body>
                                    <p style={{float:"right",color:"white"}}> <small style={{fontWeight:"bold"}}> {currentMonth} </small> </p>
                                    <Card.Title style={{color:"white",fontSize:"28px",marginBottom:"0px",fontWeight:"bolder"}}> New Users </Card.Title>
                                    <p style={{color:"white",fontSize:"34px",fontWeight:"bolder",marginLeft:"10px"}}> {usersMonth} </p>        
                            </Card.Body>
                            <div style={{position:"relative",height:"110px",width:"350px",position:"relative",top:"-40px"}}>
                                <canvas id="monthChart"></canvas>
                            </div>
                            
                    </Card>
                          
                    </Col>
              </Row>
              <Row className='m-3'>
                <form method = "post">
                    <div className="form-group searchBar">
                        <div class="input-group">
                            <input type="text" className="form-control" name="search" placeholder="Search hospitals..." onChange={(e)=>{searchHandler(e)}}/>
                            <span className="icon-inside"><BiSearchAlt style={{color:"grey",fontSize:"25px"}}/></span>
                        </div>
                    </div>
                </form>
              </Row>
               
               {
                   skeletonLoading == true?
                   (
                       <Skeleton/>
                   ):
                   (
                       filtered.length > 0?
                       (
                            <>
                                <p> <small style={{fontWeight:"bolder",marginLeft:"2px"}}> {filtered.length} records </small> </p>
                                <Table bordered hover responsive className="table__items w-100"> 
                                    <thead>
                                        <tr className="text-center">
                                            <th>S.N.</th>
                                            <th> Name </th>
                                            <th> Gender </th>
                                            <th> Username </th>
                                            <th> Phone </th>
                                            <th>Email Address</th>
                                            <th> Address </th>
                                            <th> DOB </th>
                                            <th> Frequent Hospitals </th>
                                            <th> Tickets Bought </th>
                                            <th> Revenue </th>
                                            <th> Joined At </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            content.map((val,i)=>{
                                                return(
                                                    <tr className="text-center">
                                                        <td style={{fontWeight:"bold"}}> {filtered.indexOf(val)+1} </td>
                                                        <td> {val.firstName} {val.lastName} </td>
                                                        <td> {val.gender} </td>
                                                        <td> {val.userName} </td>
                                                        <td> {val.phoneNumber} </td>
                                                        <td> {val.email} </td>
                                                        <td> {val.address} </td>
                                                        <td> {val.dob} </td>
                                                        <td> 
                                                            {
                                                                val.frequentHospitals ?
                                                                (
                                                                    <>
                                                                       {
                                                                           val.frequentHospitals.map((val)=>{
                                                                               return(
                                                                                   val.hospitalName
                                                                               )
                                                                           }).join(",")
                                                                       } 
                                                                    </>
                                                                ):
                                                                (
                                                                    <>None</>
                                                                )
                                                            }
                                                        </td>
                                                        <td> {val.ticketsBought} </td>
                                                        <td> Rs {val.revenueCollection} </td>
                                                        <td> {val.fancyCreation} </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                        
                                        
                                    </tbody>
                                </Table>
                                        {
                                            totalPages > currentPage+1?
                                            (
                                                <p style={{color:'grey',fontWeight:'400'}}> Showing {(currentPage+1)*singlePage} of <strong>{filtered.length}</strong> </p>
                                            ):
                                            (
                                                <p style={{color:'grey',fontWeight:'400'}}> Showing {filtered.length} of <strong>{filtered.length}</strong> </p>
                                            )
                                        }
                                       

                                        <ReactPaginate
                                                pageCount = {totalPages}
                                                previousLabel = "Previous"
                                                nextLabel = "Next"
                                                onPageChange = {changePage}
                                                containerClassName={"main"}
                                                previousLinkClassName={"prevStyle"}
                                                nextLinkClassName={"nextStyle"}
                                                disabledClassName={"disableButtons"}
                                                activeClassName={"pageActive"}
                                        />

                            </>
                       ):
                       (
                           <p className="text-center" style={{color:"black",fontWeight:"bolder"}}> 0 Records To Show. </p>
                       )
                   )
               }
            
                

          </div>
          </div>
          
          
            
        </React.Fragment>
    )
}

export default Users
