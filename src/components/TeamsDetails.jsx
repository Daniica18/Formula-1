import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Flag from 'react-flagkit';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

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
        const url = `http://ergast.com/api/f1/${props.year}/constructors/${params.id}/constructorStandings.json`;
        const url2 = `http://ergast.com/api/f1/${props.year}/constructors/${params.id}/results.json`
        const response = await axios.get(url);
        const response2 = await axios.get(url2);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        setTeamDetails(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        console.log("response2", response2.data.MRData.RaceTable.Races);
        setTeamResults(response2.data.MRData.RaceTable.Races)
        setIsLoading(false);
    };

    const filteredFlag = (nationality) => {
        if (nationality === "British" || nationality === "UK") {
            return "GB";
        } else if (nationality === "USA" || nationality === "United States") {
            return "US";
        } else if (nationality === "Dutch") {
            return "NL";
        } else if (nationality === "Korea") {
            return "KR";
        } else if (nationality === "UAE") {
            return "AE";
        } else if (nationality === "Azerbaijan") {
            return "AZ";
        } else if (nationality === "Monegasque") {
            return "MC";
        } else if (nationality === "Argentinian ") {
            return "AR";
        } else {
            const flag = props.flags.find(f => f.nationality === nationality || f.en_short_name === nationality);
            if (flag) {
                return flag.alpha_2_code;
            }
        }
    };

    const addClass = (position) => {
        console.log("position ", position);
        if (position == 1) {
            return "first_place";
        } else if (position == 2) {
            return "second_place";
        } else if (position == 3) {
            return "third_place";
        } else if (position == 4) {
            return "forth_place";
        } else if (position == 5) {
            return "fifth_place";
        } else if (position > 5 && position < 11) {
            return "fisrt_ten_place";
        } else {
            return "other_place";
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
        const linkTo = `/raceDetails/${id}`;
        navigate(linkTo);
    };

    const handleClickDriverDetailes = (id) => {
        const linkTo = `/driverDetails/${id}`;
        navigate(linkTo);
    };

    if (isLoading) {
        return (<Loader />)
    }

    return (
        <div className="details_div">
            <div className="details_div_info">
                <ul>
                    <li><img src={`/public/img/${teamDetails.Constructor.constructorId}.png`} alt=""
                        style={{ width: '100px', height: 'auto' }} /></li>
                    <li><Flag country={filteredFlag(teamDetails.Constructor.nationality)} /></li>
                    <li>Country: {teamDetails.Constructor.nationality}</li>
                    <li>Position: {teamDetails.position}</li>
                    <li>Points: {teamDetails.points}</li>
                    <li>History: <Link to={teamDetails.Constructor.url} target="_blank"
                        rel="noopener noreferrer">
                        <OpenInNewRoundedIcon
                            style={{ color: "black", width: '19px', height: 'auto' }} />
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

                                            <Flag className="flag" country={filteredFlag(teamResult.Circuit.Location.country)} />
                                            {teamResult.raceName}
                                        </span>
                                    </td>
                                    <td className={addClass(teamResult.Results[0].position)}>{teamResult.Results[0].position}</td>
                                    <td className={addClass(teamResult.Results[1].position)}>{teamResult.Results[1].position}</td>
                                    <td>{parseInt(teamResult.Results[0].points) + parseInt(teamResult.Results[1].points)}</td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div >

    )
};