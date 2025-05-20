import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "./Loader";

export default function TeamDetails() {
    const [teamDetails, setTeamDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        getTeamDetails();
    }, [])

    const getTeamDetails = async () => {
        const url = `http://ergast.com/api/f1/2013/constructors/${params.id}/constructorStandings.json`;
        const response = await axios.get(url);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        setTeamDetails(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
        setIsLoading(false);
    };

    if (isLoading) {
        return (<Loader />)
    }

    return (
        <div>
        </div>

    )
};