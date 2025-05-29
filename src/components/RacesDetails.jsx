import { useEffect, useState } from "react";
import { useParams } from "react-router"
import Loader from "./Loader";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router"
import Flag from 'react-flagkit';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { filteredFlagNationality, filteredFlagCountry } from "../helper/filteredFlag";
import { getRang } from "../helper/getRang";
import ErrorPage from "./ErrorPage";

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

        try {
            const resultsUrl = `http://ergast.com/api/f1/${props.year}/${params.id}/results.json`;
            const qualifyingUrl = `http://ergast.com/api/f1/${props.year}/${params.id}/qualifying.json`;
            const resultsResponse = await axios.get(resultsUrl);
            const qualifyingResponse = await axios.get(qualifyingUrl);
            console.log("Qualifying Response", qualifyingResponse.data.MRData.RaceTable.Races[0]);
            console.log("Result Response", resultsResponse.data.MRData.RaceTable.Races[0]);
            setResultsDetails(resultsResponse.data.MRData.RaceTable.Races[0]);
            setQualifyingDetails(qualifyingResponse.data.MRData.RaceTable.Races[0]);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log("error", error);
            setLoading(false);
        }
    };

    console.log("resultResponse ", resultsDetails);
    console.log("qualifyingResponse ", qualifyingDetails);

    const filteredResultsDetails = resultsDetails?.Results?.filter((el) => {
        //if no input the return the original
        if (props.text === "") {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.Driver.familyName.toLowerCase().includes(props.text) ||
                el.Constructor.name.toLowerCase().includes(props.text);
        }
    });

    const filteredQualifyingResults = qualifyingDetails?.QualifyingResults?.filter((el) => {
        //if no input the return the original
        if (props.text === "") {
            return el;
        }

        //return the item which contains the user input
        else {
            return el.Driver.familyName.toLowerCase().includes(props.text) ||
                el.Constructor.name.toLowerCase().includes(props.text);
        }
    });

    const handleClickDriverDetailes = (id) => {
        console.log(id);
        const linkTo = `/drivers/${id}`;
        navigate(linkTo);
    };

    const handleClickTeamDetails = (id) => {
        const linkTo = `/teams/${id}`;
        navigate(linkTo);
    };

    if (isLoading) {
        return (<Loader />)
    }

    return (
        <div className="details_div">
            <div className="details_div_info">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>
                                <Flag country={filteredFlagCountry(props.flags, resultsDetails.Circuit.Location.country)}
                                    size={124} />
                            </th>
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
                            <td><Link
                                to={resultsDetails.url}
                                target="_blank"
                                rel="noopener noreferrer">
                                <OpenInNewRoundedIcon
                                    style={{
                                        color: "white",
                                        width: '19px',
                                        height: 'auto'
                                    }} />
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
                        {filteredQualifyingResults.map((qualify) => {
                            const times = [qualify.Q1, qualify.Q2, qualify.Q3].sort();
                            console.log(qualify);
                            return (
                                <tr key={qualify.position}>
                                    <td>{qualify.position}</td>
                                    <td
                                        onClick={() => handleClickDriverDetailes(qualify.Driver.driverId)}
                                        className="clickable">
                                        <span>
                                            <Flag className="flag"
                                                country={filteredFlagNationality(props.flags, qualify.Driver.nationality)} />
                                            {qualify.Driver.familyName}
                                        </span>

                                    </td>
                                    <td
                                        onClick={() => handleClickTeamDetails(qualify.Constructor.constructorId)}
                                        className="clickable">
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
                        {filteredResultsDetails.map((result) => {
                            return (
                                <tr key={result.position}>
                                    <td>{result.position}</td>
                                    <td
                                        onClick={() => handleClickDriverDetailes(result.Driver.driverId)}
                                        className="clickable">
                                        <span>
                                            <Flag className="flag"
                                                country={filteredFlagNationality(props.flags, result.Driver.nationality)} />
                                            {result.Driver.familyName}
                                        </span>

                                    </td>
                                    <td
                                        onClick={() => handleClickTeamDetails(result.Constructor.constructorId)}
                                        className="clickable">
                                        {result.Constructor.name}</td>
                                    <td>{result.Time?.time}</td>
                                    <td className={getRang(result.position)}>{result.points}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
