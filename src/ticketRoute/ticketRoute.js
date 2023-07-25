import React,{useState,useEffect} from 'react'
import {Switch,Route} from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute/protectedRoute'
import Home from '../Home/home'
import Login from '../Registration/login'
import Hospital from '../User/hospital'
import Buyticket from '../User/buyticket'
import PaymentHolder from '../User/paymentHolder'
import Myticket from '../User/myticket'
import PaymentSuccess from '../User/paymentSuccess'
import Error from '../ProtectedRoute/error'
import Forgot from '../Registration/forgotpsw'


const TicketRoute = (props) => {
    let {}=props
    
    return (
        <React.Fragment>
            <Switch>
                <Route path='/' component={Home} exact></Route>
                <ProtectedRoute path='/login' component={Login} naming="Login" exact></ProtectedRoute>
                <ProtectedRoute path='/hospitals' component={Hospital} naming="Auth" exact></ProtectedRoute>
                <ProtectedRoute path='/buyticket/:hospitalId' component={Buyticket} naming="Auth" exact></ProtectedRoute>                            
                <ProtectedRoute path='/ticketdetail/:hospitalId' component={PaymentHolder} naming="Auth" exact></ProtectedRoute>                         
                <ProtectedRoute path='/myTickets' component={Myticket} naming="Auth" exact></ProtectedRoute>    
                <ProtectedRoute path="/paymentSuccess" component={PaymentSuccess} naming="Auth" exact></ProtectedRoute>                     
                <Route path="/resetPassword/:resetToken" component={Forgot} exact></Route>                     
                <Route component={Error}/>         
            </Switch>
        </React.Fragment>
    )
}

export default TicketRoute
