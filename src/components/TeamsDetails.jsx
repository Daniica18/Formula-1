import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export default function TeamDetails() {
    const [teamDetails, setTeamDetails] = useState({});
    const [teamResults, setTeamResults] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTeamDetails();
    }, [])

    const getTeamDetails = async () => {
        const url = `http://ergast.com/api/f1/2013/constructors/${params.id}/constructorStandings.json`;
        const url2 = `http://ergast.com/api/f1/2013/constructors/${params.id}/results.json`
        const response = await axios.get(url);
        const response2 = await axios.get(url2);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        setTeamDetails(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        console.log("response2", response2.data.MRData.RaceTable.Races);
        setTeamResults(response2.data.MRData.RaceTable.Races)
        setIsLoading(false);
    };

    const handleClickDetailes = (id) => {
      console.log(id);
      const linkTo = `/raceDetails/${id}`;
      navigate(linkTo);
   };

    if (isLoading) {
        return (<Loader />)
    }

    return (
        <div>
            <div>
                <ul>
                    <li>Country: {teamDetails.Constructor.nationality}</li>
                    <li>Position: {teamDetails.position}</li>
                    <li>Points: {teamDetails.points}</li>
                    <li>History: <Link to={teamDetails.Constructor.url} target="_blank"
                        rel="noopener noreferrer">
                        <img src={`/public/img/link-black.png`} alt="" style={{ width: '18px', height: 'auto' }} />
                    </Link></li>
                </ul>
            </div>


            <div>
                <table >
                    <thead>

                        <tr>
                            <th>Formula 1 2013 Results</th>
                        </tr>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>{teamResults[0].Results[0].Driver.familyName}</th>
                            <th>{teamResults[0].Results[1].Driver.familyName}</th>
                            <th>Points</th>
                        </tr>

                    </thead>
                    {teamResults.map((teamResult) => {
                        return (
                            <tbody key={teamResult.round}>
                                <tr>
                                    <td>{teamResult.round}</td>
                                    <td
                                        onClick={() => handleClickDetailes(teamResult.round)}
                                        className="clicable">
                                        {teamResult.raceName}</td>
                                    <td>{teamResult.Results[0].position}</td>
                                    <td>{teamResult.Results[1].position}</td>
                                    <td>{parseInt(teamResult.Results[0].points) + parseInt(teamResult.Results[1].points)}</td>
                                </tr>
                            </tbody>

                        )
                    })}
                </table>
            </div>

        </div >

    )
};