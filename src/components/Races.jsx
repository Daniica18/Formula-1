import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import Loader from "./Loader";
import axios from "axios";
import Flag from 'react-flagkit';

export default function Races(props) {
   const [races, setRaces] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      getRaces();
   }, [props.year]);

   const getRaces = async () => {
      const url = `http://ergast.com/api/f1/${props.year}/results/1.json`;
      const response = await axios.get(url);
      console.log(response);
      console.log(response.data);
      console.log(response.data.MRData.RaceTable.Races);
      setRaces(response.data.MRData.RaceTable.Races);
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

   const filteredData = races.filter((el) => {

      //if no input the return the original
      if (props.text === "") {
         return el;
      }

      //return the item which contains the user input
      else {
         return el.raceName.toLowerCase().includes(props.text) || el.Results[0].Driver.familyName.toLowerCase().includes(props.text) || el.Circuit.circuitName.toLowerCase().includes(props.text);
      }
   });

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
   };

   return (
      <div className="detail">
         <h1>Race Calendar</h1>
         <table className="detail_table">
            <thead>
               <tr>
                  <th colSpan={5}>Race Calendar - {props.year}</th>
               </tr>
               <tr>
                  <th>Round</th>
                  <th>Grand Prix</th>
                  <th>Circuit</th>
                  <th>Date</th>
                  <th>Winner</th>
               </tr>
            </thead>
            <tbody>
               {filteredData.map((race) => {
                  return (
                     <tr key={race.round}>
                        <td>{race.round}</td>
                        <td onClick={() => handleClickDetailes(race.round)}
                           className="clicable">
                           <Flag country={filteredFlag(race.Circuit.Location.country)} />
                           {race.raceName}</td>
                        <td>{race.Circuit.circuitName}</td>
                        <td>{race.date}</td>
                        <td
                           onClick={() => handleClickDriverDetailes(race.Results[0].Driver.driverId)}
                           className="clicable">
                           <Flag country={filteredFlag(race.Results[0].Driver.nationality)} />
                           {race.Results[0].Driver.familyName}</td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
      </div>
   );

}