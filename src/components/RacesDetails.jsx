import { useEffect, useState } from "react";
import { useParams } from "react-router"
import Loader from "./Loader";
import axios from "axios";

export default function RacesDetails() {
    const [resultsDetails, setResultsDetails] = useState([]);
    const [qualifyingDetails, setQualifyingDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getRaceDetails();
    }, []);

    const getRaceDetails = async () => {
        const resultsUrl = `http://ergast.com/api/f1/2013/${params.id}/results.json`;
        const qualifyingUrl = `http://ergast.com/api/f1/2013/${params.id}/qualifying.json`;
        const resultsResponse = await axios.get(resultsUrl);
        const qualifyingResponse = await axios.get(qualifyingUrl);
        console.log("Qualifying Response",qualifyingResponse.data.MRData.RaceTable.Races[0]);
        console.log("Result Response",resultsResponse.data.MRData.RaceTable.Races[0]);        setResultsDetails(resultsResponse.data.MRData.RaceTable.Races[0]);
        setQualifyingDetails(qualifyingResponse.data.MRData.RaceTable.Races[0]);
        setIsLoading(false);
        console.log("resultResponse ", resultsDetails);
        console.log("qualifyingResponse ", qualifyingDetails);
    };


    if (isLoading) {
        return (<Loader />)
    }
    return (
        <div>
            <div>
                <div></div>
                <div>
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
                                <td>{resultsDetails.Circuit.locality}</td>
                            </tr>
                            <tr>
                                <th>Date: </th>
                                <td>{resultsDetails.date}</td>
                            </tr>
                            <tr>
                                <th>Full Report: </th>
                                <td></td>
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
                                    <td>{qualify.Driver.familyName}</td>
                                    <td>{qualify.Constructor.name}</td>
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
                                    <td>{result.Driver.familyName}</td>
                                    <td>{result.Constructor.name}</td>
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
