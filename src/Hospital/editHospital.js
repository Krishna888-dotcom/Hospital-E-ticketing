import React,{useState,useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../common/tabpanel'
import {FaEdit} from 'react-icons/fa'
import {FcEditImage} from 'react-icons/fc'
import {MdTimer} from 'react-icons/md'
import EditDetails from './editDetails'
import EditImage from './editImage'

const EditHospital = (props) => {
    const {data} = props;

    //state goes here
    let [value,setValue] = useState(0);
    const handleChange = (e,val)=>{
        setValue(
            val
        )
    }
    return (
        <React.Fragment>
            <div class="modal fade" id={`editHospital${data._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                    
                    <div class="modal-body p-0">
                    <div className="tab__toggle">
                        
                        <AppBar position="static" style={{background:"#525a65"}}>
                            <Tabs
                               value={value}
                               onChange={handleChange}
                               variant="fullWidth"

                            >
                                
                                <Tab icon={<FaEdit style={{fontSize:"21px"}}/>} label="Edit Details"/>
                                <Tab icon={<FcEditImage style={{fontSize:"21px"}}/>} label="Edit Image"/>
                                
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0} style={{background:"white",boxShadow:"2px 3px 4px rgba(0,0,0,0.6)",padding:"4px"}}>
                           <EditDetails data={data}/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <EditImage data={data}/>
                        </TabPanel>

                       
                        
                    </div>
                    
                    </div>
                    
                </div>
             </div>
             </div>       
        </React.Fragment>
    )
}

export default EditHospital
