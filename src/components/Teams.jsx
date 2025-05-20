import axios from "axios";
import Loader from "./Loader";
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
         {teams.map((team,i)=>{
            console.log(team);
            return(
                <table>
                    <thead>
                        <tr>
                            <th>Constructors Standings</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={team.}> 
                            <td>{team.ConstructorStandings[0].position}</td>
                            <td>{team.ConstructorStandings[0].Constructor.constructorId}</td>
                            <td><a href="Details"/></td>
                            <td>{team.ConstructorStandings[0].points}</td>
                        </tr>
                    </tbody>
                   

                </table>
            )
         })}   
            
        </div>
    );


}