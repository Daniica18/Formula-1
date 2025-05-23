import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import Flag from 'react-flagkit';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

export default function DriversDetails(props) {
    const [driversDetails, setDriversDetails] = useState([]);
    const [Results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getDriversDetails();
    }, [props.year]);

    const getDriversDetails = async () => {

        const driverUrl = `http://ergast.com/api/f1/${props.year}/drivers/${params.id}/driverStandings.json`;
        const driverRacesUrl = `http://ergast.com/api/f1/${props.year}/drivers/${params.id}/results.json`;
        const response = await axios.get(driverUrl);
        const response2 = await axios.get(driverRacesUrl);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);

        setDriversDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0])

        setResults(response2.data.MRData.RaceTable.Races)
        console.log("response2", response2.data.MRData.RaceTable.Races);
        setLoading(false);
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

    const handleClickDetails = () => {
        const linkTo = `/teams`;
        navigate(linkTo);
    };

    const handleClickTeamDetails = (id) => {
        const linkTo = `/teamDetails/${id}`;
        navigate(linkTo);
    };

    const handleClickRaceDetails = (id) => {
        const linkTo = `/raceDetails/${id}`;
        navigate(linkTo);
    };

    if (loading) {
        return <Loader />;
    };

    return (
        <div>
            <div>
                <ul>
                    <li><img src={`/public/img/_${driversDetails.Driver.driverId}.jpg`} alt=""
                        style={{ width: '150px', height: 'auto' }} /></li>
                    <li><Flag country={filteredFlag(driversDetails.Driver.nationality)} /></li>
                    <li>{driversDetails.Driver.givenName}</li>
                    <li>{driversDetails.Driver.familyName}</li>
                    <li>Country: {driversDetails.Driver.nationality}</li>
                    <li
                        onClick={() => handleClickTeamDetails(driversDetails.Constructors[0].constructorId)}
                        className="clicable">Team: {driversDetails.Constructors[0].name} </li>
                    <li>Birth: {driversDetails.Driver.dateOfBirth}</li>
                    <li>Biography: <Link to={driversDetails.Driver.url} target="_blank"
                        rel="noopener noreferrer">
                        <OpenInNewRoundedIcon
                            style={{ color: "black", width: '19px', height: 'auto' }} />
                    </Link></li>
                </ul>
            </div>
            <div>
                <div>
                    <h1>Formula 1 - {props.year} Results</h1>
                    <table className="detail_table">
                        <thead>
                            <tr>
                                <th>Round</th>
                                <th>Grand Prix</th>
                                <th>Team</th>
                                <th>Grid</th>
                                <th>Race</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Results.map((result, i) => {
                                return (
                                    <tr key={result.round}>
                                        <td>{result.round}</td>
                                        <td
                                            onClick={() => handleClickRaceDetails(result.round)}
                                            className="clicable">
                                            <Flag country={filteredFlag(result.Circuit.Location.country)} />
                                            {result.raceName}</td>
                                        <td
                                            onClick={() => handleClickDetails()}
                                            className="clicable">
                                            {result.Results[0].Constructor.name}</td>
                                        <td>{result.Results[0].grid}</td>
                                        <td>{result.Results[0].position}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>



            </div>
        </div>
    )
}

