import React,{useState,useEffect} from 'react';
import axios from 'axios';
import useLoader from '../common/useLoader'

const useOverview = () => {
    let {loading,loadingHandler} = useLoader();
    //state goes here
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${sessionStorage.getItem('token')}`
            }
        }
    })

    //hospital side
    let [chartHospital,setChartHospital] = useState({});
    let [hospitals,setHospital] = useState([]);
    let [totalHospitals,setTotal] = useState(0);

    //user side
    let [chartUser,setChartUser] = useState({});
    let [users,setUsers] = useState([]);
    let [totalUsers,setTotalUsers] = useState(0);

    //revenue
    let [revenueChart,setRevenueChart] = useState({});
    let [totalRevenue,setTotalRevenue] = useState(0);



    //effect goes here
    useEffect(()=>{
        loadingHandler(true)
        axios.get(process.env.REACT_APP_URL+"getOverallHospitalsAnalysis",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setChartHospital(response.data.data);
                setHospital(response.data.hospitals);
                setTotal(response.data.overallHospitals)
            }
            else
            {
                setChartHospital({});
                setHospital([]);
                setTotal(0)
            }
            loadingHandler(false);
        })
        .catch((err)=>{
            console.log(err);
        })

    },[]);

    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"getOverallUsers",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setChartUser(response.data.userAndCount);
                setUsers(response.data.data);
                setTotalUsers(response.data.overallUsers)
            }
            else
            {
                setChartUser({});
                setUsers([]);
                setTotalUsers(0);
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])


    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"getOverallRevenue",auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setRevenueChart(response.data.monthAndRevenue);
                setTotalRevenue(response.data.overallRevenue)
            }
            else
            {
                setRevenueChart({});
                setTotalRevenue(0);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    })



    return {chartHospital,hospitals,totalHospitals,chartUser,users,totalUsers,revenueChart,totalRevenue,loading};
}

export default useOverview
