import { useEffect, useState } from "react";
import { useParams } from "react-router"
import Loader from "./Loader";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router"
import Flag from 'react-flagkit';

export default function RacesDetails(props) {
    const [resultsDetails, setResultsDetails] = useState([]);
    const [qualifyingDetails, setQualifyingDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRaceDetails();
    }, []);

    const getRaceDetails = async () => {
        const resultsUrl = `http://ergast.com/api/f1/2013/${params.id}/results.json`;
        const qualifyingUrl = `http://ergast.com/api/f1/2013/${params.id}/qualifying.json`;
        const resultsResponse = await axios.get(resultsUrl);
        const qualifyingResponse = await axios.get(qualifyingUrl);
        console.log("Qualifying Response", qualifyingResponse.data.MRData.RaceTable.Races[0]);
        console.log("Result Response", resultsResponse.data.MRData.RaceTable.Races[0]); setResultsDetails(resultsResponse.data.MRData.RaceTable.Races[0]);
        setQualifyingDetails(qualifyingResponse.data.MRData.RaceTable.Races[0]);
        setIsLoading(false);
        console.log("resultResponse ", resultsDetails);
        console.log("qualifyingResponse ", qualifyingDetails);
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

    const handleClickDriverDetailes = (id) => {
        console.log(id);
        const linkTo = `/driverDetails/${id}`;
        navigate(linkTo);
    };

    const handleClickTeamDetails = (id) => {
        const linkTo = `/teamDetails/${id}`;
        navigate(linkTo);
    };


    if (isLoading) {
        return (<Loader />)
    }
    return (
        <div>
            <div>
                <div></div>
                <div>
                    <Flag country={filteredFlag(resultsDetails.Circuit.Location.country)} />
                    <h2>{resultsDetails.Circuit.circuitName}</h2>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Country: </th>
                                <td>{resultsDetails.Circuit.Location.country}</td>
                            </tr>
                            <tr>
                                <th>Location: </th>
                                <td>{resultsDetails.Circuit.Location.locality}</td>
                            </tr>
                            <tr>
                                <th>Date: </th>
                                <td>{resultsDetails.date}</td>
                            </tr>
                            <tr>
                                <th>Full Report: </th>
                                <td><Link to={resultsDetails.url}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <img src={`/public/img/link-black.png`} alt="link"
                                        style={{ width: '18px', height: 'auto' }} />
                                </Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Qualifying results</th>
                        </tr>
                        <tr>
                            <th>Position</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Best Time</th>
                        </tr>
                        {qualifyingDetails.QualifyingResults.map((qualify) => {
                            const times = [qualify.Q1, qualify.Q2, qualify.Q3].sort();
                            return (
                                <tr key={qualify.position}>
                                    <td>{qualify.position}</td>
                                    <td
                                        onClick={() => handleClickDriverDetailes(qualify.Driver.driverId)}
                                        className="clicable">
                                        <Flag country={filteredFlag(qualify.Driver.nationality)} />
                                        {qualify.Driver.familyName}</td>
                                    <td
                                        onClick={() => handleClickTeamDetails(qualify.Constructor.constructorId)}
                                        className="clicable">
                                        {qualify.Constructor.name}</td>
                                    <td>{times[0]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Race results</th>
                        </tr>
                        <tr>
                            <th>Position</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Results</th>
                            <th>Points</th>
                        </tr>
                        {resultsDetails.Results.map((result) => {
                            return (
                                <tr key={result.position}>
                                    <td>{result.position}</td>
                                    <td
                                        onClick={() => handleClickDriverDetailes(result.Driver.driverId)}
                                        className="clicable">
                                        <Flag country={filteredFlag(result.Driver.nationality)} />
                                        {result.Driver.familyName}</td>
                                    <td
                                        onClick={() => handleClickTeamDetails(result.Constructor.constructorId)}
                                        className="clicable">
                                        {result.Constructor.name}</td>
                                    <td>{result.Time?.time}</td>
                                    <td>{result.points}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
