import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router";
import {Link} from "react-router";

export default function DriversDetails() {
    const [driversDetails, setDriversDetails] = useState([]);
    const [driverReasults, setDriverReasults] = useState([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getDriversDetails();
    }, []);

    const getDriversDetails = async () => {
        /*console.log("params", params);*/

        const url = `http://ergast.com/api/f1/2013/drivers/${params.id}/driverStandings.json`
        const url2 = `http://ergast.com/api/f1/2013/drivers/${params.id}/driverStandings.json`
        const response = await axios.get(url);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        setDriversDetails(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0])

        setLoading(false);
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
                        <img src={`/public/img/link-black.png`} alt="" style={{ width: '18px', height: 'auto'}} />
                        </Link></li>
                    {/*Biography: <a href={driversDetails.Driver.url} target="_blank" rel="noopener noreferrer">{driversDetails.Driver.url}</a>*/}
                
                </ul>
            </div>
            <div>

            </div>
        </div>
    )
}

