import axios from "axios";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";



export default function Teams() {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, []);

    const getTeams = async () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        const response = await axios.get(url);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setIsLoading(false);
    }

    const handleClickDetails = (id) => {
        console.log(id);
        const linkTo = `/teamDetails/${id}`
        navigate(linkTo);
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            <h1>Constructors Championship</h1>
            <table>
                <thead>
                    <tr>
                        <th>Constructors Champions Standings</th>
                    </tr>
                </thead>
                {teams.map((team) => {
                    return (
                        <tbody>
                            <tr key={team.Constructor.constructorId}>
                                <td>{team.position}</td>
                                <td onClick={() => handleClickDetails(team.Constructor.constructorId)}
                                    className="clicable">
                                    {team.Constructor.name}</td>
                                <td>Details: <Link to={team.Constructor.url} target="_blank"
                                    rel="noopener noreferrer">
                                    <img src={`/public/img/link-black.png`} alt="" style={{ width: '18px', height: 'auto' }} />
                                </Link></td>
                                <td>{team.points}</td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>

        </div>
    );
}