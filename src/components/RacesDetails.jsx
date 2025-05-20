import { useEffect, useState } from "react";
import { useParams} from "react-router"
import Loader from "./Loader";
import axios from "axios";

export default function RaceDetails() {
    const [raceDetails, setRaceDettails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getRaceDetails();
    }, []);

    const getRaceDetails = async () => {
        console.log("params", params);
        const url = `http://ergast.com/api/f1/2013/results/1.json`;
        const response = await axios.get(url);
        console.log(response);
        setRaceDettails(response.data);
        setIsLoading(false);
    };
    

    if (isLoading) {
            return (<Loader />)
        }
    return (
        <>
            <h2>Comment details</h2>

            <table className="customTable">
                <tr>
                    <th>PostId:</th>
                    <td>{commentDetails.postId}</td>
                </tr>
                <tr>
                    <th>Id:</th>
                    <td>{commentDetails.id}</td>
                </tr>
                <tr>
                    <th>Name:</th>
                    <td>{commentDetails.name}</td>
                </tr>
                <tr>
                    <th>Email:</th>
                    <td>{commentDetails.email}</td>
                </tr>
                <tr>
                    <th>Body:</th>
                    <td>{commentDetails.body}</td>
                </tr>
            </table>
        </>
    )
}