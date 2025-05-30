import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import Flag from 'react-flagkit';
import { filteredFlagNationality } from "../helper/filteredFlag";
import { getMedals } from "../helper/Medals";
import ErrorPage from "./ErrorPage";

export default function Drivers(props) {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDrivers();
  }, [props.year]);

  const getDrivers = async () => {
    try {
      const url = `https://ergast.com/api/f1/${props.year}/driverStandings.json`;
      const response = await axios.get(url);
      setDrivers(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const filteredData = drivers.filter((el) => {
    //if no input the return the original
    if (props.text === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.Driver.familyName.toLowerCase().includes(props.text) ||
        el.Driver.givenName.toLowerCase().includes(props.text) ||
        el.Constructors[0].name.toLowerCase().includes(props.text);
    }
  });

  const handleClickDetails = (id) => {
    const linkTo = `/drivers/${id}`;
    navigate(linkTo);
  };

  const handleClickTeamDetails = (id) => {
    const linkTo = `/teams/${id}`;
    navigate(linkTo);
  }

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return (
      <ErrorPage />
    )
  };

  return (
    <div className="detail">
      <h1>Drivers Championship</h1>
      <table className="detail_table">
        <thead>
          <tr>
            <th colSpan={4}>Drivers Chamionship Standing - {props.year}</th>

          </tr>
        </thead>
        <tbody>
          {filteredData.map((driver) => {
            return (
              <tr key={driver.Driver.driverId} style={getMedals(driver.position)}>
                <td>{driver.position}</td>
                <td width="45%"
                  onClick={() => handleClickDetails(driver.Driver.driverId)}
                  className="clickable"
                >
                  <span>
                    <Flag className="flag"
                      country={filteredFlagNationality(props.flags, driver.Driver.nationality)} />
                    {driver.Driver.familyName} {driver.Driver.givenName}
                  </span>
                </td>
                <td width="45%"
                  onClick={() => handleClickTeamDetails(driver.Constructors[0].constructorId)}
                  className="clickable">
                  {driver.Constructors[0].name}
                </td>
                <td width="10%">{driver.points}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}