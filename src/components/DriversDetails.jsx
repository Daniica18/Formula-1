import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export default function DriversDetails() {
    const [driversDetails, setDriversDetails] = useState([]);
    const [Results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getDriversDetails();
    }, []);

    const getDriversDetails = async () => {
        /*console.log("params", params);*/

        const driverUrl = `http://ergast.com/api/f1/2013/drivers/${params.id}/driverStandings.json`;
        const driverRacesUrl = `http://ergast.com/api/f1/2013/drivers/${params.id}/results.json`;
        const response = await axios.get(driverUrl);
        const response2 = await axios.get(driverRacesUrl);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);

        setDriversDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0])


        setResults(response2.data.MRData.RaceTable.Races)
        console.log("response2", response2.data.MRData.RaceTable.Races);
        setLoading(false);
    }

    const handleClickDetails = () => {
        const linkTo = `/teams`;
        navigate(linkTo);
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <div>
            <div>
                <ul>
                    <li>{driversDetails.Driver.givenName}</li>
                    <li>{driversDetails.Driver.familyName}</li>
                    <li>Country: {driversDetails.Driver.nationality}</li>
                    <li>Team: {driversDetails.Constructors[0].name} </li>
                    <li>Birth: {driversDetails.Driver.dateOfBirth}</li>
                    <li>Biography: <Link to={driversDetails.Driver.url} target="_blank"
                        rel="noopener noreferrer">
                        <img src={`/public/img/link-black.png`} alt="" style={{ width: '18px', height: 'auto' }} />
                    </Link></li>
                </ul>
            </div>
            <div>
                <div>
                    <h1>Formula 1 2013 Results</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th>Round</th>
                                <th>Grand Prix</th>
                                <th>Team</th>
                                <th>Grid</th>
                                <th>Race</th>
                            </tr>
                            {Results.map((result, i) => {
                                return (
                                    <tr key={result.round}>
                                        <td>{result.round}</td>
                                        <td>{result.raceName}</td>
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

