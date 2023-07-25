import React,{useState,useEffect} from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import PulseLoader from 'react-spinners/PulseLoader'

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      background:'rgba(0,0,0,0.5)',
      
    },
  }));

const PaymentLoader = (props) => {
    const {} = props;
    const classes = useStyles();
    return (
        <React.Fragment>
        {/* open is inbuild boolean variable in backdrop component */}
            <Backdrop className={classes.backdrop} open>  
                <p className="text-center mb-5" style={{fontSize:"32px",color:"white",fontWeight:"bolder"}}>Processing....</p>
                <PulseLoader loading={true} color="white" size={15} className="text-center"/>
            </Backdrop>
        </React.Fragment>
    )
}

export default PaymentLoader
