import axios from "axios";
import { useEffect, useState} from "react";
import {useParams} from "react-router";
 import Loader from"./Loader";




export default function TeamsDetails() {
    
     const[teamsDetails, setTeamsDetails] = useState({});
    const[isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(()=>{
        getTeamsDetails();
    },[])

    const getTeamsDetails = async () =>{
        const url ="http://ergast.com/api/f1/2013/constructors/id/constructorStandings.json";
        const response = await axios.get(url);
        console.log(response);
        setTeamsDetails(response.data);
        setIsLoading(false);
    };

    if(isLoading){
         return(<Loader/>)
     }
    
    return (
        <>
        
        </>

    )
};