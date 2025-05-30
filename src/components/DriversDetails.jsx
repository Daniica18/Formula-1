import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link, useParams } from "react-router";
import { useNavigate } from "react-router";
import Flag from 'react-flagkit';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { filteredFlagNationality, filteredFlagCountry } from "../helper/filteredFlag";
import { getMedals } from "../helper/Medals";
import ErrorPage from "./ErrorPage";
const BASE_URL = import.meta.env.BASE_URL;


export default function DriversDetails(props) {
    const [driversDetails, setDriversDetails] = useState({});
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getDriversDetails();
    }, [props.year]);

    const getDriversDetails = async () => {
        try {
            const driverUrl = `https://ergast.com/api/f1/${props.year}/drivers/${params.id}/driverStandings.json`;
            const driverRacesUrl = `https://ergast.com/api/f1/${props.year}/drivers/${params.id}/results.json`;
            const resultsResponse = await axios.get(driverUrl);
            const driverStandingsResponse = await axios.get(driverRacesUrl);
            setDriversDetails(resultsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0])
            setResults(driverStandingsResponse.data.MRData.RaceTable.Races)
            setLoading(false);

        } catch (error) {
            setError(error);
            setLoading(false);
        }

    };

    const filteredData = results.filter((el) => {
        //if no input the return the original
        if (props.text === "") {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.raceName.toLowerCase().includes(props.text) ||
                el.Results[0].Constructor.name.toLowerCase().includes(props.text);
        }
    });

    const handleClickDetails = () => {
        const linkTo = `/teams`;
        navigate(linkTo);
    };

    const handleClickTeamDetails = (id) => {
        const linkTo = `/teams/${id}`;
        navigate(linkTo);
    };

    const handleClickRaceDetails = (id) => {
        const linkTo = `/races/${id}`;
        navigate(linkTo);
    };

    if (loading) {
        return <Loader />;
    };

    if (error) {
        return (
            <ErrorPage />
        )
    };

    return (
        <div className="details_div">
            <div className="details_div_info">
                <ul>
                    <li><img src={`${BASE_URL + `img/_${driversDetails.Driver.driverId}.jpg`}`}
                        onError={(e) => {
                            e.target.onerrore = null;
                            e.target.src = BASE_URL + "img/_avatar.jpg"
                        }} alt={BASE_URL + "img/_avatar.jpg"}
                        style={{
                            width: '150px',
                            height: 'auto',
                            padding: `30px`
                        }} /></li>
                    <li><Flag
                        style={{
                            width: '50px',
                            height: 'auto',
                            paddingBottom: '20px'
                        }}
                        country={filteredFlagNationality(props.flags, driversDetails.Driver.nationality)} /></li>
                    <li style={{ fontSize: '30px' }}>{driversDetails.Driver.givenName}</li>
                    <li style={{
                        paddingBottom: '20px',
                        fontSize: '30px'
                    }}>{driversDetails.Driver.familyName}</li>
                    <li>Country: {driversDetails.Driver.nationality}</li>
                    <li
                        onClick={() => handleClickDetails()}
                        className="clickable">Team: {driversDetails.Constructors[0].name} </li>
                    <li>Birth: {driversDetails.Driver.dateOfBirth}</li>
                    <li>Biography: <Link to={driversDetails.Driver.url} target="_blank"
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
                            {filteredData.map((result, i) => {
                                return (
                                    <tr key={result.round}>
                                        <td>{result.round}</td>
                                        <td
                                            onClick={() => handleClickRaceDetails(result.round)}
                                            className="clickable">
                                            <span>
                                                <Flag className="flag"
                                                    country={filteredFlagCountry(props.flags, result.Circuit.Location.country)} />
                                                {result.raceName}
                                            </span>

                                        </td>
                                        <td
                                            onClick={() => handleClickTeamDetails(result.Results[0].Constructor.constructorId)}
                                            className="clickable">
                                            {result.Results[0].Constructor.name}</td>
                                        <td>{result.Results[0].grid}</td>
                                        <td style={getMedals(result.Results[0].position)}>{result.Results[0].position}</td>
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

