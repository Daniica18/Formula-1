import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import Loader from "./Loader";
import axios from "axios";

export default function Races() {
   const [races, setRaces] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      getRaces();
   }, []);

   const getRaces = async () => {
      const url = "http://ergast.com/api/f1/2013/results/1.json";
      const response = await axios.get(url);
      console.log(response);
      console.log(response.data);
      console.log(response.data.MRData.RaceTable.Races);
      setRaces(response.data.MRData.RaceTable.Races);
      setIsLoading(false);
   };

   const handleClickDetailes = (id) => {
      console.log(id);
      const linkTo = `/raceDetails/${id}`;
      navigate(linkTo);
   };

   const handleClickDriverDetailes = (id) => {
      console.log(id);
      const linkTo = `/driverDetails/${id}`;
      navigate(linkTo);
   };

   if (isLoading) {
      return (<Loader />)
   }

   return (
      <div>
         <h1>Race Calendar</h1>
         <table>
            <tbody>
               <tr>
                  <th>Race Calendar - 2013</th>
               </tr>
               <tr>
                  <th>Round</th>
                  <th>Grand Prix</th>
                  <th>Circuit</th>
                  <th>Date</th>
                  <th>Winner</th>
               </tr>
               {races.map((race) => {
                  return (
                     <tr key={race.round}>
                        <td>{race.round}</td>
                        <td onClick={() => handleClickDetailes(race.round)}
                           className="clicable">
                           {race.raceName}</td>
                        <td>{race.Circuit.circuitName}</td>
                        <td>{race.date}</td>
                        <td
                        onClick={() => handleClickDriverDetailes(race.Results[0].Driver.driverId)}
                           className="clicable">
                           {race.Results[0].Driver.familyName}</td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
      </div>
   );

}