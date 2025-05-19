import axios from "axios";
// import Loader from "./Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";





export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        const url ="http://ergast.com/api/f1/2013/constructorStandings.json";
        const response = await axios.get(url);
        console.log(response.data.MRData.StandingsTable.StandingsLists);
        setTeams(response.data.MRData.StandingsTable.StandingsLists);
        setIsLoading(false);
    }

    // if(isLoading){
    //     return<Loader />
    // }

    return (
        <div>
         {teams.map((team)=>{
            console.log(team);
            return(
                <table>
                   

                </table>
            )
         })}   
            
        </div>
    );


}