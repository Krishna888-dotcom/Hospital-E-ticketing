import React,{useState} from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import DateAnalysis from '../Hospital/RevenueAnalysis/dateAnalysis';
import WeekAnalysis from '../Hospital/RevenueAnalysis/weekAnalysis';
import MonthlyAnalysis from '../Hospital/RevenueAnalysis/monthlyAnalysis'

const Revenue = (props) => {
    let {} = props;
    //variable goes here
    let hospitalUsername = JSON.parse(sessionStorage.getItem('user')).userName;

    //state goes here
    let [timeSwitch,setTimeSwitch] = useState("");

    //handler
    const timeChanger = (e)=>{
        setTimeSwitch(
            e.target.value
        )
    }

    //component loaders goes here
    const loadContent = ()=>{
        if(timeSwitch == "")
        {
            return (
                <p className="text-center" style={{color:"black",fontWeight:"bolder"}}> Choose A Time To View The Analysis. </p>
            )
        }
        else if(timeSwitch == "Date")
        {
            return (
                <DateAnalysis hospital={hospitalUsername}/>
            )
        }
        else if(timeSwitch == "Week")
        {
            return (
               <WeekAnalysis hospital={hospitalUsername}/>
            )
        }
        else if(timeSwitch == "Month")
        {
            return (
                <MonthlyAnalysis hospital={hospitalUsername}/>
            )
        }
    }

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                    <h1 className="font-weight-bold mb-2 pb-3 red" style={{color:"grey",fontWeight:"bold"}}>Revenue</h1>
                    </Col>
                    <Col lg={10} md={8} xs={6}></Col>
                    <Col lg={2} md={4} xs={6}>
                        <form method="post">
                            <div  className="form-group">
                                <select className="form-select" name="time" onChange={(e)=>{timeChanger(e)}} style={{width:"90%",border:"1px solid black"}}>
                                    <option value=""> Select Time </option>
                                    <option value="Date"> Date </option>
                                    <option value="Week"> Week </option>
                                    <option value="Month"> Month </option>
                                </select>
                            </div>
                        </form>
                    </Col>
                    <Col lg={12} className="mt-3">
                        {
                            loadContent()
                        }
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Revenue
