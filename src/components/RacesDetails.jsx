import { useEffect, useState } from "react";
import { useParams} from "react-router"
import Loader from "./Loader";
import axios from "axios";

export default function RacesDetails() {
    const [rasultsDetails, setRsultsDettails] = useState({});
    const [qualifyingDetails, setQualifyingDettails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getRaceDetails();
    }, []);

    const getRaceDetails = async () => {
        console.log("params", params);
        const url1 = `http://ergast.com/api/f1/2013/${params.id}/results.json`;
        const url2 = `http://ergast.com/api/f1/2013/${params.id}/qualifying.json`;
        const response1 = await axios.get(url1);
        const response2 = await axios.get(url2);
        console.log(response1);
        setRsultsDettails(response1.data);
        console.log(response1);
        setQualifyingDettails(response1.data);
        setIsLoading(false);
    };
    

    if (isLoading) {
            return (<Loader />)
        }
    return (
        <>
        </>
    )
}
