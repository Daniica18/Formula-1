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
  }, []);

  const getDrivers = async () => {
    const url = 'http://ergast.com/api/f1/2013/driverStandings.json';
    const response = await axios.get(url);
    console.log(response);
    setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
    setLoading(false);
  };

  const filteredFlag = (nationality) => {
        console.log("nationality ", nationality);
        if (nationality === "British" || nationality === "UK") {
            return "GB";
        } else if (nationality === "USA") {
            return "US";
        } else if (nationality === "Dutch") {
            return "NL";
        } else if (nationality === "Korea") {
            return "KR";
        } else if (nationality === "UAE") {
            return "AE";
        } else {
            const flag = props.flags.find(f => f.nationality === nationality || f.en_short_name === nationality);
            console.log("flag ", flag);
            if (flag) {
                return flag.alpha_2_code;
            }
        }
    };

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
    <div>
          <h1>Drivers Championship</h1>
      <table>
        <thead>
          <tr>
            <th>Drivers Chamionship Standing -2013</th>

          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, i) => {
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