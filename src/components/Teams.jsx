import axios from "axios";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Flag from 'react-flagkit';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

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

    const filteredFlag = (nationality) => {
        if (nationality === "British" || nationality === "UK") {
            return "GB";
        } else if (nationality === "USA" || nationality === "United States") {
            return "US";
        } else if (nationality === "Dutch") {
            return "NL";
        } else if (nationality === "Korea") {
            return "KR";
        } else if (nationality === "UAE") {
            return "AE";
        } else if (nationality === "Azerbaijan") {
            return "AZ";
        } else if (nationality === "Monegasque") {
            return "MC";
        } else if (nationality === "Argentinian ") {
            return "AR";
        } else {
            const flag = props.flags.find(f => f.nationality === nationality || f.en_short_name === nationality);
            if (flag) {
                return flag.alpha_2_code;
            }
        }
    };

    const addClass = (position) => {
        if (position == 1) {
            return "first_place";
        } else if (position == 2) {
            return "second_place";
        } else if (position == 3) {
            return "third_place";
        } else {
            return "";
        }
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
        const linkTo = `/teamDetails/${id}`
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
                            <tr className={addClass(team.position)} key={team.Constructor.constructorId}>
                                <td>{team.position}</td>
                                <td onClick={() => handleClickDetails(team.Constructor.constructorId)}
                                    className='clickable'>
                                    <span>
                                        <Flag className="flag" country={filteredFlag(team.Constructor.nationality)} />
                                        {team.Constructor.name}
                                    </span>
                                </td>
                                <td>Details: <Link to={team.Constructor.url} target="_blank"
                                    rel="noopener noreferrer">
                                    <OpenInNewRoundedIcon
                                        style={{ color: "black", width: '19px', height: 'auto' }} />
                                </Link></td>
                                <td className={addClass(team.position)}>{team.points}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    );
}