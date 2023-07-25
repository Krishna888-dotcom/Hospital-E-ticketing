import React,{useState,useEffect} from 'react'

const usePassword = (props) => {
    
    //state goes here
    let [eye,setEye] = useState(false);
    let [eye2,setEye2] = useState(false);
    
    const passwordToggler = (e)=>{
        let pwField = document.querySelector('.password');

        if(pwField.type === 'password')
        {
            pwField.type = "text"
        }
        else
        {
            pwField.type = "password"
        }
        setEye(!eye);
    }

    const passwordToggler2 = (e)=>{
        let pwField = document.querySelector('.password2');

        if(pwField.type === 'password')
        {
            pwField.type = "text"
        }
        else
        {
            pwField.type = "password"
        }
        setEye2(!eye2);
    }


    return {eye,eye2,passwordToggler,passwordToggler2}
}

export default usePassword
