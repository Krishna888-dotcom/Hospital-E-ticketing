import React,{useState,useEffect} from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import Self from './self';
import Other from './other'
import './ticket.css';
import axios from 'axios';
import HospitalInfo from './hospitalInfo';
import useCommon from '../common/useCommon';



const Buyticket = (props) => {
    let {} = props;
    let {auth} = useCommon();
    let [direction,setDirection] = useState("Self");

    useEffect(()=>{
        if(sessionStorage.getItem('ticketKey'))
        {
            axios.post(process.env.REACT_APP_URL+"deleteMyTicket",{"token":sessionStorage.getItem('ticketKey')},auth.config)
            .then((response)=>{
                if(response.data.success == true)
                {
                    sessionStorage.removeItem('ticketKey');
                    sessionStorage.removeItem('bankKey')
                    window.location.reload();
                }
                
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },[]);
    
    const switchDirection = (e) =>{
        let direction = e.target.innerHTML.trim();
        if(direction == "Others")
        {
            document.querySelector(`#btn`).style.left = "110px";
            document.querySelector('.btn__2').style.color="white";
            document.querySelector('.btn__1').style.color="black";
        }
        else if(direction == "Self")
        {
            document.querySelector(`#btn`).style.left = "0px";
            document.querySelector('.btn__1').style.color="white";
            document.querySelector('.btn__2').style.color="black";
        }

        setDirection(
            direction
        )
    }

    return (
        <React.Fragment>
   
          <Container className="mt-5">
              <Row>
                 <Col lg={6}>
                    <HospitalInfo/>
                 </Col>
                 
                  <Col lg={6} md={10} xs={10}>
                      <div className="outer__design">
                      
                            <div className='button-box'>
                                <div id='btn'></div>
                                <button type='button' onClick={(e)=>{switchDirection(e)}} className='toggle-btn btn__1' style={{fontWeight:"600",color:"white"}}>Self</button>
                                <button type='button' onClick={(e)=>{switchDirection(e)}} className='toggle-btn btn__2' style={{fontWeight:"600"}}>Others</button>
                            </div>

                            {
                                direction == "Self"?
                                (
                                    <Self/>
                                ):
                                (
                                    <Other/>
                                )
                            }
                      </div>
                  </Col>
                
              </Row>
          </Container>
           
                       
                
            
        </React.Fragment>
    )
}

export default Buyticket
