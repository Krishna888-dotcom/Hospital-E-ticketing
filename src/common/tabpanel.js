import React,{useState,useEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import '../style.css';

const TabPanel = (props) => {
    const {children,value,index,...other } = props;

    return (
        <React.Fragment>
                <div
                    role="tabpanel"
                    hidden={value !== index}
                    id={`scrollable-auto-tabpanel-${index}`}
                    aria-labelledby={`scrollable-auto-tab-${index}`}
                    {...other}
            >
                    {
                value == index &&
                (
                   
                    <p>{children}</p>
                )
            }
            </div>
        </React.Fragment>
    )
}

export default TabPanel
