import React,{useState,useEffect} from 'react'

const ProgressButton = () => {
    return (
        <React.Fragment>
            <button className="btn btn__Add" style={{ boxShadow: '4px 3px 8px #424242'}} type="button" disabled>
                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                 Processing...
            </button>
        </React.Fragment>
    )
}

export default ProgressButton
