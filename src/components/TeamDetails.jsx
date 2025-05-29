import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Flag from 'react-flagkit';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { filteredFlagNationality, filteredFlagCountry } from "../helper/filteredFlag";
import { getRang } from "../helper/getRang";

export default function TeamDetails(props) {
    const [teamDetails, setTeamDetails] = useState({});
    const [teamResults, setTeamResults] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTeamDetails();
    }, [props.year])

    const getTeamDetails = async () => {
        try {
            const url = `http://ergast.com/api/f1/${props.year}/constructors/${params.id}/constructorStandings.json`;
            const url2 = `http://ergast.com/api/f1/${props.year}/constructors/${params.id}/results.json`
            const teamResponse = await axios.get(url);
            const teamStandingResponse = await axios.get(url2);
            console.log(teamResponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
            console.log("response2", teamStandingResponse.data.MRData.RaceTable.Races);
            setTeamDetails(teamResponse.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
            setTeamResults(teamStandingResponse.data.MRData.RaceTable.Races)
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log("error", error);
            setLoading(false);
        }
    };

    const filteredData = teamResults.filter((el) => {
        //if no input the return the original
        if (props.text === "") {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.raceName.toLowerCase().includes(props.text);
        }
    });

    const handleClickDetailes = (id) => {
        const linkTo = `/races/${id}`;
        navigate(linkTo);
    };

    const handleClickDriverDetailes = (id) => {
        const linkTo = `/drivers/${id}`;
        navigate(linkTo);
    };

    if (isLoading) {
        return (<Loader />)
    };

    return (
        <div className="details_div">
            <div className="details_div_info">
                <ul>
                    <li><img src={`/public/img/${teamDetails.Constructor.constructorId}.png`}
                        alt="team_logo"
                        style={{
                            width: '150px',
                            height: 'auto',
                            padding: '30px'
                        }} /></li>
                    <li><Flag
                        country={filteredFlagNationality(props.flags, teamDetails.Constructor.nationality)}
                        size={124} />
                    </li>
                    <li>Country: {teamDetails.Constructor.nationality}</li>
                    <li>Position: {teamDetails.position}</li>
                    <li>Points: {teamDetails.points}</li>
                    <li>History: <Link
                        to={teamDetails.Constructor.url}
                        target="_blank"
                        rel="noopener noreferrer">
                        <OpenInNewRoundedIcon
                            style={{
                                color: "white",
                                width: '19px',
                                height: 'auto'
                            }} />
                    </Link></li>
                </ul>
            </div>

            <div className="tableThree">
                <table className="detail_table">
                    <thead>

                        <tr>
                            <th colSpan={5}>Formula 1 - {props.year} Results</th>
                        </tr>
                        <tr>
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th
                                onClick={() => handleClickDriverDetailes(teamResults[0].Results[0].Driver.driverId)}
                                className="clickable">
                                {teamResults[0].Results[0].Driver.familyName}</th>
                            <th
                                onClick={() => handleClickDriverDetailes(teamResults[0].Results[1].Driver.driverId)}
                                className="clickable">
                                {teamResults[0].Results[1].Driver.familyName}</th>
                            <th>Points</th>
                        </tr>

                    </thead>
                    <tbody>
                        {filteredData.map((teamResult) => {
                            return (
                                <tr key={teamResult.round}>
                                    <td>{teamResult.round}</td>
                                    <td
                                        onClick={() => handleClickDetailes(teamResult.round)}
                                        className="clickable">
                                        <span>

                                            <Flag className="flag"
                                                country={filteredFlagCountry(props.flags, teamResult.Circuit.Location.country)} />
                                            {teamResult.raceName}
                                        </span>
                                    </td>
                                    <td className={getRang(teamResult.Results[0].position)}>
                                        {teamResult.Results[0].position}
                                    </td>
                                    <td className={getRang(teamResult.Results[1].position)}>
                                        {teamResult.Results[1].position}
                                    </td>
                                    <td>
                                        {parseInt(teamResult.Results[0].points) + parseInt(teamResult.Results[1].points)}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div >

    )
};