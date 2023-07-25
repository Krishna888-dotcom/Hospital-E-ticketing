import React,{useState,useEffect} from 'react'
import { Container,Row,Col } from 'react-bootstrap'

const Error = (props) => {
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={12}>
                        <h2 className="text-center" style={{fontWeight:"bolder",color:"black"}}> 404 Page Not Found....  </h2>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Error
