import React,{useState,useEffect} from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import {Code} from 'react-content-loader';

const Skeleton = (props) => {
    const {height,width} = props;
    return (
        <React.Fragment>
             <Container fluid>
            <Row>
                <Col lg={2} md={4} xs={4}></Col>
                <Col lg={4} md={4} xs={4}>
                        <Code 
                        height={height}
                        width={width}
                        speed={1}
                        style={{margin:"10px"}}
                        backgroundColor="rgba(255,255,255,0.7)"
                        
                        /> 
                       
                </Col>
                <Col lg={4} md={4} xs={4}>
                        <Code 
                        height={height}
                        width={width}
                        speed={1}
                        style={{margin:"10px"}}
                        backgroundColor="rgba(255,255,255,0.7)"
                        
                        /> 
                       
                </Col>
                <Col lg={2} md={4} xs={4}></Col>
            </Row>
        </Container>
        </React.Fragment>
    )
}

export default Skeleton
