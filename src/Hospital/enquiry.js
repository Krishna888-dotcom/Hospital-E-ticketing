import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Container,Row,Col,Card,Table} from 'react-bootstrap';
import useCommon from '../common/useCommon'
import Skeleton from '../common/Skeleton';
import useLoader from '../common/useLoader'
import {SiGooglemessages} from 'react-icons/si'
import EnquiryModal from './enquiryModal'
import ReactPaginate from 'react-paginate'


const Enquiry = (props) => {
    const {} = props;
    const {auth} = useCommon();
    const {skeletonLoading,skeletonHandler} = useLoader();

    //state goes here
    let [pending,setPending] = useState([]);
    let [solved,setSolved] = useState([]);
    let [pendingPage,setPendingPage] = useState(0);
    let [solvedPage,setSolvedPage] = useState(0);

    let singlePage = 6;
    let pendingVisited = singlePage * pendingPage;
    let solvedVisited = singlePage * solvedPage;


    //effect goes here
    useEffect(()=>{
        skeletonHandler(true)
        axios.get(process.env.REACT_APP_URL+"fetchEnquiries",auth.config)
        .then((response)=>{
            if(response.data.success == true) {
                setPending(
                    response.data.pending
                )
                setSolved(
                    response.data.solved
                )
            }
            else
            {
                setPending([])
                setSolved([])
            }
            skeletonHandler(false)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);

    const changePage = ({selected})=>{
        setPendingPage(
            selected
        )
    }
    const changePage2 = ({selected})=>{
        setSolvedPage(
            selected
        )
    }

    let totalPendingPages = Math.ceil(pending.length / singlePage);
    let totalSolvedPages = Math.ceil(solved.length / singlePage);
    let pendingContent = pending.slice(pendingVisited,pendingVisited +singlePage)
    let solvedContent = solved.slice(solvedVisited,solvedVisited +singlePage)

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <h5 style={{color:"black",fontWeight:"bolder",fontSize:"25px"}}>  Enquiries </h5>
                    </Col>
                    <Col lg={3} md={12} xs={12}>
                            <div className="card" style={{margin:"10px",width:"100%",height:'120px',background:'#4b1cac',boxShadow:"0px 0px 15px rgba(0,0,0,0.6)",borderRadius:"10px"}}>
                                <div className="card-body">
                                    <Card.Title style={{color:"white",fontSize:"28px",marginBottom:"0px",fontWeight:"bolder",textAlign:"center"}}> Total Enquiry </Card.Title>
                                    <p style={{color:"white",fontSize:"34px",fontWeight:"bolder",textAlign:"center"}}> {pending.length + solved.length} </p>
                                </div>
                                
                            </div>
                    </Col>
                    <Col lg={3} md={12} xs={12}>
                            <div className="card" style={{margin:"10px",width:"100%",height:'120px',background:'#c1549c',boxShadow:"0px 0px 15px rgba(0,0,0,0.6)",borderRadius:"10px"}}>
                                <div className="card-body">
                                    <Card.Title style={{color:"white",fontSize:"28px",marginBottom:"0px",fontWeight:"bolder",textAlign:"center"}}> Pending </Card.Title>
                                    <p style={{color:"white",fontSize:"34px",fontWeight:"bolder",textAlign:"center"}}> {pending.length} </p>
                                </div>
                                
                            </div>
                    </Col>
                    <Col lg={3} md={12} xs={12}>

                            <div className="card" style={{margin:"10px",width:"100%",height:'120px',background:'#A88EEC',boxShadow:"0px 0px 15px rgba(0,0,0,0.6)",borderRadius:"10px"}}>
                                <div className="card-body">
                                    <Card.Title style={{color:"white",fontSize:"28px",marginBottom:"0px",fontWeight:"bolder",textAlign:"center"}}> Solved </Card.Title>
                                    <p style={{color:"white",fontSize:"34px",fontWeight:"bolder",textAlign:"center"}}> {solved.length} </p>
                                </div>
                                
                            </div>

                    </Col>
                    <Col lg={3} className="d-none d-md-none d-lg-block"></Col>

                    {
                        skeletonLoading == true?
                        (
                            <Skeleton/>
                        ):
                        (
                            <>
                            <Col lg={12} xs={12} md={12} className="mt-3 mb-3">
                                <h5 className="text-center mb-3" style={{fontWeight:"bolder",color:"grey"}}>  Pending Enquiries  </h5>
                                {
                                    pending.length > 0?(
                                        <>
                                        <Table bordered hover responsive className="table__items w-100">
                                            <thead>
                                                <tr className="text-center">
                                                    <th> S.No </th>
                                                    <th> Date </th>
                                                    <th> Fullname </th>
                                                    <th> Email </th>
                                                    <th> Address </th>
                                                    <th> Contact </th>
                                                    <th> Message </th>
                                                                               
                                                   
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    pendingContent.map((val)=>{
                                                        return(
                                                            <>
                                                            <tr className="text-center">
                                                                <td style={{fontWeight:"bold"}}> {pending.indexOf(val)+1} </td>
                                                                <td> {val.fancyDate} </td>
                                                                <td> {val.firstName} {val.lastName} </td>
                                                                <td> {val.emailAddress} </td>
                                                                <td> {val.address} </td>
                                                                <td> {val.contact} </td>
                                                                <td> 
                                                                    <button className="btn btn-success btn-md" id="enquiry" style={{boxShadow: '2px 3px 6px rgba(0,0,0,0.6)',width:"80px"}} type="button" data-bs-toggle="modal" data-bs-target={`#showMessage${val._id}`}> <SiGooglemessages style={{fontSize:"20px"}}/> </button> 
                                                                </td>
                                                                
                                                                
                                                            </tr>
                                                            <EnquiryModal nomenclature="showMessage" data={val} key={`message${val._id}`}/>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>

                                        {
                                            totalPendingPages > pendingPage+1?
                                            (
                                                <p style={{color:'grey',fontWeight:'400'}}> Showing {(pendingPage+1)*singlePage} of <strong>{pending.length}</strong> </p>
                                            ):
                                            (
                                                <p style={{color:'grey',fontWeight:'400'}}> Showing {pending.length} of <strong>{pending.length}</strong> </p>
                                            )
                                        }

                                        <ReactPaginate
                                                pageCount = {totalPendingPages}
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
                                        <p className="text-center" style={{fontWeight: "bold",color:'black'}}> 0 Pending Enquiries </p>
                                    )
                                }

                                <h5 className="text-center mt-3 mb-3" style={{fontWeight:"bolder",color:"grey"}}>  Solved Enquiries  </h5>
                                {
                                    solved.length > 0?(
                                        <>
                                        <Table bordered hover responsive className="table__items w-100">
                                            <thead>
                                                <tr className="text-center">
                                                    <th> S.No </th>
                                                    <th> Date </th>
                                                    <th> Fullname </th>
                                                    <th> Email </th>
                                                    <th> Address </th>
                                                    <th> Contact </th>
                                                    <th> Message </th>
                                                                               
                                                   
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    solvedContent.map((val)=>{
                                                        return(
                                                            <>
                                                            <tr className="text-center">
                                                                <td style={{fontWeight:"bold"}}> {solved.indexOf(val)+1} </td>
                                                                <td> {val.fancyDate} </td>
                                                                <td> {val.firstName} {val.lastName} </td>
                                                                <td> {val.emailAddress} </td>
                                                                <td> {val.address} </td>
                                                                <td> {val.contact} </td>
                                                                <td> 
                                                                    <button className="btn btn-success btn-md" style={{boxShadow: '2px 3px 6px rgba(0,0,0,0.6)',width:"80px"}} type="button" data-bs-toggle="modal" data-bs-target={`#showMessage${val._id}`}> <SiGooglemessages style={{fontSize:"20px"}}/> </button> 
                                                                </td>
                                                                
                                                                
                                                            </tr>
                                                            <EnquiryModal nomenclature="showMessage" data={val} key={`message${val._id}`}/>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>

                                        {
                                            totalSolvedPages > solvedPage+1?
                                            (
                                                <p style={{color:'grey',fontWeight:'400'}}> Showing {(solvedPage+1)*singlePage} of <strong>{solved.length}</strong> </p>
                                            ):
                                            (
                                                <p style={{color:'grey',fontWeight:'400'}}> Showing {solved.length} of <strong>{solved.length}</strong> </p>
                                            )
                                        }

                                        <ReactPaginate
                                                pageCount = {totalSolvedPages}
                                                previousLabel = "Previous"
                                                nextLabel = "Next"
                                                onPageChange = {changePage2}
                                                containerClassName={"main"}
                                                previousLinkClassName={"prevStyle"}
                                                nextLinkClassName={"nextStyle"}
                                                disabledClassName={"disableButtons"}
                                                activeClassName={"pageActive"}
                                        />

                                        </>
                                       
                                        
                                    ):
                                    (
                                        <p className="text-center" style={{fontWeight: "bold",color:'black'}}> 0 Solved Enquiries </p>
                                    )
                                }
                            </Col>     
                            </>
                        )
                    }

                   
                </Row>
            </Container>

        </React.Fragment>
    )
}

export default Enquiry
