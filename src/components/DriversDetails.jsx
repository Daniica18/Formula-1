import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router";

export default function DriversDetails(){
    const[driversDetails,setDriversDetails] = useState([]);
    const[loading,setLoading] = useState(true);
    const params = useParams();

    useEffect (()=> {
        getDriversDetails();
    },[]);
    
    const getDriversDetails = async()=> {
        console.log("params",params);
        
        const url = "'http://ergast.com/api/f1/'2013 /driverStandings.json"
        const response = await axios.get(url);
        console.log(response);
        setDriversDetails ()
        
    }
}
