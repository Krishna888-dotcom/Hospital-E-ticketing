import React,{useState,useEffect} from 'react'
import {Row,Col,Container,Table,Card} from 'react-bootstrap'
import axios from 'axios';
import Skeleton from '../common/Skeleton';
import useLoader from '../common/useLoader'
import ReactPaginate from 'react-paginate';
import {toast} from 'react-toastify'
import {CSVLink} from 'react-csv';
import {FaDownload} from 'react-icons/fa'

const Myticket = (props) => {
    let {} = props;
    let {skeletonLoading,skeletonHandler} = useLoader();
    //state goes here
    let [myTickets,setMyTickets] = useState([]);
    let [currentPage,setCurrentPage] = useState(0);
    let [csvData,setCsvData] = useState([]);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${sessionStorage.getItem('token')}`
            }
        }
    })

    //variables
    let singlePage = 5;
    let pageVisited = singlePage * currentPage;

    //effect goes here
    useEffect(()=>{
        skeletonHandler(true);
        axios.get(process.env.REACT_APP_URL+"getMyTickets",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setMyTickets(
                    response.data.data
                )
            }
            else
            {
                setMyTickets([]);
            }
            skeletonHandler(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"generateCsv/",auth.config)
        .then((response)=>{
           if(response.data.success == true)
           {
              setCsvData(
                  response.data.data
              )
           }
         
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
   
    let content = myTickets.slice(pageVisited,pageVisited+singlePage);
    let totalPages = Math.ceil(myTickets.length / singlePage)

    //handlers
    const changePage = ({selected})=>{
        setCurrentPage(
            selected
        )
    }

    var headers = [];
    if(csvData.length > 0)
    {
        let dataBox = csvData[0];
        for(var i in dataBox)
        {
            headers.push({"label":i,"key":i})
        }
    }
   
    const csvReport = {
        filename:`tickets${Date.now()}.csv`,
        headers:headers,
        data:csvData
    }

    return (
        <React.Fragment>
             <div className="container mt-3" style={{borderRadius:'20px'}}>
               
                    <p style={{float:"right",fontWeight:"bold",color:"black",right:"100px",position:"relative"}}> {myTickets.length} tickets.  </p>
                    {
                        skeletonLoading == true?
                        (
                            <Skeleton style={{clear:"both"}}/>
                        ):
                        (
                            myTickets.length > 0?
                        (
                            <>  
                            <Row>
                                <Col lg={2}>
                                <CSVLink {...csvReport} style={{textDecoration:"none",fontWeight:"bolder",color:"black",left:"88px",position:"relative"}}> Download CSV <FaDownload/> </CSVLink>
                                </Col>
                                </Row>    
                            <Row style={{clear:"both"}}> 
                            
                            {
                                content.map((val)=>{
                                    return (
                                        <div className="container my-3">
                <div className="row">
                    <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
                        <div>
                            <h1 className="display-4">Ticket Details</h1>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12 my-auto">
                                <img src={`${process.env.REACT_APP_URL}${val.ticketId.hospitalId.hospitalImage}`} className="img-fluid" alt="selected room" />
                            </div>
                            <div className="col-md-6 col-12 my-auto">
                                <h1 style={{fontSize:"30px"}}>{val.ticketId.hospitalId.hospitalName}</h1>
                                <Table className="table table-striped myTable">
                                    <thead>
                                        <tr>
                                            <th>Patient Name</th>
                                            <td>{val.patientName}</td>
                                        </tr>
                                        <tr>
                                            <th>Age</th>
                                            <td>{val.age}</td>
                                        </tr>
                                        <tr>
                                            <th>Gender</th>
                                            <td>{val.gender}</td>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <td>{val.ticketId.date2}</td>
                                        </tr>
                                        <tr>
                                            <th>Shift</th>
                                            <td>{val.ticketId.shift}</td>
                                        </tr>
                                        <tr>
                                            <th>Department</th>
                                            <td>{val.department}</td>
                                        </tr>
                                        <tr>
                                            <th>Ticket Number</th>
                                            <td>{val.ticketNo}</td>
                                        </tr>
                                        <tr>
                                            <th>Ticket Fee</th>
                                            <td>Rs {val.ticketId.price}</td>
                                        </tr>
                                    </thead>
                                </Table>
                            </div>
                        </div>
                        <div className="row my-3">
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label  className="mr-3" style={{color:'black',fontWeight:"bolder"}}>Checkup Time : <span style={{fontWeight:"normal"}}>{val.ticketId.startTime}-{val.ticketId.endTime}</span></label>
                            </div>
                        </div>
                        <div className="col-12 mt-2">
                            <mark style={{fontWeight:"bold"}}>Always laugh when you can, it is cheap medicine.</mark>
                        </div>
                        <div className="col-12">
                        {
                            val.ticketStatus != "Completed"?
                            (
                                <button className="btn btn-success mt-5" style={{position: "relative",float: "right"}}>Confirmed</button>
                               
                            ):
                            (
                                <button className="btn btn-success mt-5" style={{position: "relative",float: "right"}}>Completed</button>
                            )
                        }
                        </div>

                    </div>

                    </div>
                </div>
            </div>
                                    )
                                })
                            } 

                             {
                                            totalPages > pageVisited+1?
                                            (
                                                <p style={{color:'grey',fontWeight:'400'}}> Showing {(pageVisited+1)*singlePage} of <strong>{myTickets.length}</strong> </p>
                                            ):
                                            (
                                                <p style={{color:'grey',fontWeight:'400'}}> Showing {myTickets.length} of <strong>{myTickets.length}</strong> </p>
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
                        
                        </Row> 
                        </>
                        ):
                        (
                            <p className="text-center" style={{fontWeight:"bolder",color:"#0f6c81",clear:"both",fontSize:"26px"}}> 0 Booking Records Available. </p>
                        )
                        )
                    }
                   
                                 
            </div>
            
        </React.Fragment>
    )
}

export default Myticket
