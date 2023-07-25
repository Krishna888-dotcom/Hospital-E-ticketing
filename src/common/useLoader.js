import React,{useState,useEffect} from 'react'


const useLoader = () => {
    let [loading,setLoading] = useState(false);
    let [skeletonLoading,setSkeleton] = useState(false);
    let [payLoading,setPayLoading] = useState(false);

    const loadingHandler = (data)=>{
        setLoading(data);
    }

    const skeletonHandler = (data)=>{
        setSkeleton(data);
    }

    const paymentHandler = (data)=>{
        setPayLoading(data);
    }

    return {loading,loadingHandler,skeletonLoading,skeletonHandler,payLoading,paymentHandler};
}

export default useLoader
