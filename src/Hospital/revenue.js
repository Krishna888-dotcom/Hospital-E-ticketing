import React,{useState,useEffect} from 'react';
import {Row,Col,Container,Table } from 'react-bootstrap';
import axios from 'axios';
import DateAnalysis from './RevenueAnalysis/dateAnalysis'
import WeekAnalysis from './RevenueAnalysis/weekAnalysis'
import MonthlyAnalysis from './RevenueAnalysis/monthlyAnalysis';


const Revenue = (props) => {
    let {} = props
   
    //state goes here
    let [hospitals,setHospitals] = useState([]);
    let [hospital,setHospital] = useState("");
    let [selection,setSelection] = useState("");

    //effect goes here
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"fetchHospitals")
        .then((response)=>{
            if(response.data.success == true)
            {
                setHospitals(
                    response.data.data
                )
            }
            else
            {
                setHospitals([])
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        if(hospitals && hospitals.length > 0)
        {
            try
            {
                const selectedss = document.querySelector(".selected");
                const optionsContainer = document.querySelector(".options-container");
                const searchBox = document.querySelector(".search-box input");
                
                const optionsList = document.querySelectorAll(".option");
                
                selectedss.addEventListener("click", () => {
                  optionsContainer.classList.toggle("active");
                
                  searchBox.value = "";
                  filterList("");
                
                  if (optionsContainer.classList.contains("active")) {
                    searchBox.focus();
                  }
                });
                
                optionsList.forEach(o => {
                  o.addEventListener("click", () => {
                    selectedss.innerHTML = o.querySelector("label").innerHTML;
                 
                    optionsContainer.classList.remove("active");
                  });
                });
                
                searchBox.addEventListener("keyup", function(e) {
                  filterList(e.target.value);
                });
                
                const filterList = searchTerm => {
                  searchTerm = searchTerm.toLowerCase();
                  optionsList.forEach(option => {
                    let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
                    if (label.indexOf(searchTerm) != -1) {
                      option.style.display = "block";
                    } else {
                      option.style.display = "none";
                    }
                  });
                }
            }

            catch(err)
            {
                console.log(err);
            }
        
        }
       
        
    },[hospitals.length])

    //events goes here
    const loadComponent = ()=>{
        if(selection == "")
        {
            return (
                <p className="text-center mt-3" style={{color:"black",fontWeight:"bold"}}> Choose A Time And Hospital To View A Revenue Analysis  </p>
            )
        }
        else if(selection == "Week")
        {
            return (
                <WeekAnalysis hospital={hospital}/>
            )
        }
        else if(selection == "Month")
        {
            return (
                <MonthlyAnalysis hospital={hospital}/>
            )
        }
        else if(selection == "Day")
        {
            return (
               <DateAnalysis hospital = {hospital}/>
            )
        }
    }


    return (
        <React.Fragment>
            <div className="container-fluid">
                <p style={{fontSize:"25px",color:"black",fontWeight:"bolder",marginLeft:"9px"}}>Revenue</p>
                <div className="headings">
                    <Row>
                       
                        <Col lg={4}>
                        <form method="post">
                          <div className="form-group">
                            
                                          <div class="select-box" style={{marginLeft:"17px"}}>
                                          <div className="options-container" style={{boxShadow:"2px 2px 4px rgba(0,0,0,0.6)"}}>
                                                
                                                          {
                                                              hospitals.map((val)=>{
                                                                  return(
                                                                      <div className="option" onClick={(event)=>{setHospital(val.userName);}}>
                                                                          <input type="radio" className="radio" id={`team${val._id}`} name="teamId" value={val._id}/>
                                                                          <label className="text-dark" for={`team${val._id}`}>{val.hospitalName}</label>
                                                                      </div> 
                                                          
                                                          
                                                                  )
                                                              })
                                                          }           
                                                          
                                          </div>

                                          <div className="selected">
                                              Select Hospital
                                          </div>
                                                      

                                          <div className="search-box">
                                                  <input type="text" placeholder="Start Typing..." />
                                                  </div>
                                          </div>
                            </div>
                        </form>
                        </Col>
                        <Col lg={6} className="d-none d-md-none d-lg-block"></Col>
                        <Col lg={2}>
                        <form method ="post">
                            <div className="form-group revenue">								
                                <select className="form-select" name="timeSelection" onChange={(e)=>{setSelection(e.target.value)}} style={{width:"90%",border:"1px solid black"}}>
                                    <option value="">Select Time</option>
                                    <option value="Month">Month</option>
                                    <option value="Week">Week</option>
                                    <option value="Day">Date</option>
                                </select>
                            </div>
                        </form>
                        </Col>
                        <Col lg={12}>
                            {
                                loadComponent()
                            }
                        </Col>
                    </Row>
                    
                    
                    
                    
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default Revenue
