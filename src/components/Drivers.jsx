import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  // const[loading,setLoading] = useState(true);
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

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Drivers Chamionship Standing</th>

          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, i) => {

            return (
              <tr key={driver.Driver.driverId}>
                <td>{driver.position}</td>
                <td>{driver.Driver.familyName} {driver.Driver.givenName}</td>
                <td>{driver.Constructors[0].name}</td>
                <td>{driver.points}</td>

              </tr>
            )

          })}


        </tbody>
      </table>
    </div>

  )
}