import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Flag from 'react-flagkit';

export default function TeamDetails(props) {
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

    const filteredFlag = (nationality) => {
        console.log("nationality ", nationality);
        if (nationality === "British" || nationality === "UK") {
            return "GB";
        } else if (nationality === "USA") {
            return "US";
        } else if (nationality === "Dutch") {
            return "NL";
        } else if (nationality === "Korea") {
            return "KR";
        } else if (nationality === "UAE") {
            return "AE";
        } else {
            const flag = props.flags.find(f => f.nationality === nationality || f.en_short_name === nationality);
            console.log("flag ", flag);
            if (flag) {
                return flag.alpha_2_code;
            }
        }
    };


    const handleClickDetailes = (id) => {
        console.log(id);
        const linkTo = `/raceDetails/${id}`;
        navigate(linkTo);
    };

    const handleClickDriverDetailes = (id) => {
        console.log(id);
        const linkTo = `/driverDetails/${id}`;
        navigate(linkTo);
    };

    if (isLoading) {
        return (<Loader />)
    }

    return (
        <div>
            <div>
                <ul>
                    <li><img src={`/public/img/${teamDetails.Constructor.constructorId}.png`} alt=""
                        style={{ width: '100px', height: 'auto' }} /></li>
                    <li><Flag country={filteredFlag(teamDetails.Constructor.nationality)} /></li>
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
                            <th
                                onClick={() => handleClickDriverDetailes(teamResults[0].Results[0].Driver.driverId)}
                                className="clicable">
                                {teamResults[0].Results[0].Driver.familyName}</th>
                            <th
                                onClick={() => handleClickDriverDetailes(teamResults[0].Results[0].Driver.driverId)}
                                className="clicable">
                                {teamResults[0].Results[1].Driver.familyName}</th>
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
                                        <Flag country={filteredFlag(teamResult.Circuit.Location.country)} />
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