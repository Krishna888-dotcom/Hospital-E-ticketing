import React,{useState,useEffect} from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import PaymentModal from './paymentModal'


const HospitalPayment = (props) => {
    const {hospitalId} = props;
    return (
        <React.Fragment>
            <Row className="p-4">
                <Col lg={6}>
                    <button className="btn btn-success btn-md w-100" style={{boxShadow:"2px 2px 6px rgba(0,0,0,0.6)"}} data-bs-toggle="modal" data-bs-target="#pay"  type="button" name="pay"> Pay </button>
                    <PaymentModal nomenclature="pay" hospitalId={hospitalId}/>
                </Col>
                <Col lg={6}>
                    <button className="btn btn-danger btn-md w-100" style={{boxShadow:"2px 2px 6px rgba(0,0,0,0.6)"}} data-bs-toggle="modal" data-bs-target="#cancel" type="button" name="cancel"> Cancel </button>
                    <PaymentModal nomenclature="cancel" hospitalId={hospitalId}/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default HospitalPayment
