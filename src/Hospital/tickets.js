import React,{useState,useEffect} from 'react'
import { Row,Table } from 'react-bootstrap'
import {BiSearchAlt} from 'react-icons/bi'
import axios from 'axios';
import useLoader from '../common/useLoader';
import useCommon from '../common/useCommon'
import Skeleton from '../common/Skeleton';
import ReactPaginate from 'react-paginate';

const Tickets = (props) => {
    let {} = props;
    let {skeletonLoading,skeletonHandler} = useLoader();
    let {auth} = useCommon();

    //state
    let [search,setSearch] = useState("");
    let [soldTickets,setSoldTickets] = useState([]);
    let [currentPage,setCurrentPage] = useState(0);

    let singlePage = 10;
    let pageVisited = currentPage * singlePage;

    //effect
    useEffect(()=>{
        skeletonHandler(true);
        axios.get(process.env.REACT_APP_URL+"fetchSoldTickets",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setSoldTickets(
                    response.data.data
                )
            }
            else
            {
                setSoldTickets([]);
            }
            skeletonHandler(false);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    //handler
    const searchHandler = (e)=>{
        setSearch(
            e.target.value
        )
    }

    const changePage = ({selected})=>{
        setCurrentPage(
            selected
        )
    }

    let filtered = soldTickets.filter((val)=>{
        return (
            val.ticketId.hospitalId.hospitalName.trim().toLowerCase().startsWith(search.toLowerCase().trim()) ||
            val.patientName.trim().toLowerCase().startsWith(search.toLowerCase().trim()) ||
            val.address.trim().toLowerCase().startsWith(search.toLowerCase().trim()) ||
            val.department.trim().toLowerCase().startsWith(search.toLowerCase().trim()) ||
            val.ticketNo.trim() == search.trim()
        )
    })

    let totalPages = Math.ceil(filtered.length / singlePage);
    let content = filtered.slice(pageVisited,pageVisited+singlePage);
    
    return (
        <React.Fragment>
            <div className="container-fluid">
                <p style={{fontWeight:"bolder",fontSize:"23px",marginLeft:"10px"}}> Tickets  </p>
            
           
              <Row className='m-3'>
                <form method = "post">
                    <div className="form-group searchBar">
                        <div class="input-group">
                            <input type="text" className="form-control" name="search" onChange={(e)=>{searchHandler(e)}} placeholder="Search hospitals..."/>
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
                            <p> <small style={{fontWeight:"bold"}}> {filtered.length} Records. </small> </p>
                            <Table bordered hover responsive className="table__items w-100"> 
                            <thead>
                                <tr className="text-center">
                                    <th>S.N.</th>
                                    <th> Hospital Name </th>
                                    <th> Date </th>
                                    <th> Shift </th>
                                    <th> Time </th>
                                    <th> Department </th>  
                                    <th> Ticket Number </th> 
                                    <th> Patient Name </th>
                                    <th> Gender </th>
                                    <th>Address</th>
                                    <th> Phone </th>
                                    <th>Email</th>
                                    <th> Price </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    content.map((val)=>{
                                        return (
                                            <tr className="text-center">
                                                <td style={{fontWeight:"bold"}}> {filtered.indexOf(val)+1} </td>
                                                <td> {val.ticketId.hospitalId.hospitalName} </td>
                                                <td> {val.ticketId.date2} </td>
                                                <td> {val.ticketId.shift} </td>
                                                <td> {val.ticketId.startTime}-{val.ticketId.endTime} </td> 
                                                <td> {val.department} </td>
                                                <td> {val.ticketNo} </td>  
                                                <td> {val.patientName}  </td>
                                                <td> {val.gender} </td>
                                                <td> {val.address} </td>
                                                <td> {val.buyerId.phoneNumber} </td>
                                                <td> {val.buyerId.email} </td>
                                                <td> Rs {val.ticketId.price} </td>
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
                        <p className="text-center" style={{color:"black",fontWeight:"bolder",marginTop:"10px"}}> No Records To Fetch </p>
                    )
                    )
                    
                }
               
               

          </div>
          
            
        </React.Fragment>
    )
}

export default Tickets
