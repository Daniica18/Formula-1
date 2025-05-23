import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import Flag from 'react-flagkit';

export default function Drivers(props) {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getDrivers();
  }, [props.year]);

  const getDrivers = async () => {
    const url = `http://ergast.com/api/f1/${props.year}/driverStandings.json`;
    const response = await axios.get(url);
    console.log(response);
    setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    setLoading(false);
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

    const filteredData = drivers.filter((el) => {

    //if no input the return the original

    if (props.text === "") {

      return el;

    }

    //return the item which contains the user input

    else {

      return el.Driver.familyName.toLowerCase().includes(props.text) || el.Driver.givenName.toLowerCase().includes(props.text) || el.Constructors[0].name.toLowerCase().includes(props.text);

    }

  });

  const handleClickDetails = (id) => {
    const linkTo = `/driverDetails/${id}`;
    navigate(linkTo);
  };

  const handleClickTeamDetails = (id) => {
    const linkTo = `/teamDetails/${id}`;
    navigate(linkTo);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="detail">
          <h1>Drivers Championship</h1>
      <table className="detail_table">
        <thead>
          <tr>
            <th colSpan={4}>Drivers Chamionship Standing -{props.year}</th>

          </tr>
        </thead>
        <tbody>
          {filteredData.map((driver) => {
            return (
              <tr key={driver.Driver.driverId}>
                <td>{driver.position}</td>
                <td
                  onClick={() => handleClickDetails(driver.Driver.driverId)}
                  className="clicable"
                >
                  <Flag country={filteredFlag(driver.Driver.nationality)} />
                  {driver.Driver.familyName} {driver.Driver.givenName}
                </td>
                <td
                  onClick={() => handleClickTeamDetails(driver.Constructors[0].constructorId)}
                  className="clicable">
                  {driver.Constructors[0].name}</td>
                <td>{driver.points}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}