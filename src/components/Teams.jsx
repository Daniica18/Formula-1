import axios from "axios";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Flag from 'react-flagkit';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { filteredFlagNationality } from "../helper/FilteredFlag";
import { getMedals } from "../helper/Medals";

export default function Teams(props) {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getTeams();
    }, [props.year]);

    const getTeams = async () => {
        const url = `http://ergast.com/api/f1/${props.year}/constructorStandings.json`;
        const response = await axios.get(url);
        console.log("res ", response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setTeams(response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setIsLoading(false);
    };

    const filteredData = teams.filter((el) => {
        //if no input the return the original
        if (props.text === "") {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.Constructor.name.toLowerCase().includes(props.text);
        }

    });


    const handleClickDetails = (id) => {
        const linkTo = `/teams/${id}`
        navigate(linkTo);
    };

    if (isLoading) {
        return <Loader />
    };

    return (
        <div className="detail">
            <h1>Constructors Championship</h1>
            <table className="detail_table">
                <thead>
                    <tr>
                        <th colSpan={4}>Constructors Champions Standings - {props.year}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((team) => {
                        return (
                            <tr style={getMedals(team.position)}
                                key={team.Constructor.constructorId}>
                                <td>{team.position}</td>
                                <td onClick={() => handleClickDetails(team.Constructor.constructorId)}
                                    className='clickable'>
                                    <span>
                                        <Flag className="flag"
                                            country={filteredFlagNationality(props.flags, team.Constructor.nationality)} />
                                        {team.Constructor.name}
                                    </span>
                                </td>
                                <td>Details: <Link
                                    to={team.Constructor.url}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <OpenInNewRoundedIcon
                                        style={{
                                            color: "black",
                                            width: '19px',
                                            height: 'auto'
                                        }} />
                                </Link></td>
                                <td>{team.points}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    );
}