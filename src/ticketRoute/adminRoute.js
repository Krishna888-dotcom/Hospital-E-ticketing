import React,{useState,useEffect} from 'react'
import {Switch,Route} from 'react-router-dom'
import Hospital from '../Hospital/hospital';
import SideBar from '../Navbar/Sidebar';
import Overview from '../Hospital/overview';
import Revenue from '../Hospital/revenue';
import Users from '../Hospital/users';
import Tickets from '../Hospital/tickets';
import Error from '../ProtectedRoute/error'
import Enquiry from '../Hospital/enquiry';



const AdminRoute = (props) => {
    let {} = props; 
    const [inactive, setInactive] = useState(false);
    return (
        <React.Fragment>

                <SideBar
                     onCollapse={(inactive) => {
                       
                        setInactive(inactive);
                    }}
                />

                <div className={`side-content ${inactive ? 'inactive':""}`}>
                    <Switch>
                  
                            <Route path="/hospital" component={Hospital} exact></Route>
                            <Route path="/overview" component={Overview} exact></Route>
                            <Route path="/revenue" component={Revenue} exact></Route>
                            <Route path="/users" component={Users} exact></Route>
                            <Route path="/tickets" component={Tickets} exact></Route>
                            <Route path="/enquiries" component={Enquiry} exact></Route>
                            <Route component={Error}/>       
                    </Switch>
                </div>
        </React.Fragment>
    )
}

export default AdminRoute
