import { useEffect, useState } from "react";
import { useParams } from "react-router"
import Loader from "./Loader";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router"
import Flag from 'react-flagkit';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

export default function RacesDetails(props) {
    const [resultsDetails, setResultsDetails] = useState([]);
    const [qualifyingDetails, setQualifyingDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getRaceDetails();
    }, [props.year]);

    const getRaceDetails = async () => {
        const resultsUrl = `http://ergast.com/api/f1/${props.year}/${params.id}/results.json`;
        const qualifyingUrl = `http://ergast.com/api/f1/${props.year}/${params.id}/qualifying.json`;
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
        } else if (nationality === "Argentinian") {
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
        <div className="details_div">
            <div className="details_div_info tableOne">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}><Flag country={filteredFlag(resultsDetails.Circuit.Location.country)} size={124} /></th>
                        </tr>
                        <tr>
                            <th colSpan={2}>{resultsDetails.Circuit.circuitName}</th>
                        </tr>
                    </thead>
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
                                <OpenInNewRoundedIcon
                                    style={{ color: "black", width: '19px', height: 'auto' }} />
                            </Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="tableTwo">
                <table className="detail_table">
                    <thead>
                        <tr>
                            <th colSpan={5}>Qualifying results</th>
                        </tr>
                        <tr>
                            <th>Position</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Best Time</th>
                        </tr>
                    </thead>
                    <tbody>
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
            <div className="tableThree">
                <table className="detail_table">
                    <thead>
                        <tr>
                            <th colSpan={5}>Race results</th>
                        </tr>
                        <tr>
                            <th>Position</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Results</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
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
                                    <td className={addClass(result.position)}>{result.points}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
