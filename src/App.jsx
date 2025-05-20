import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriversDetails from "./components/DriversDetails";
import TeamsDetails from "./components/TeamsDetails";
import RacesDetails from "./components/RacesDetails";

export default function App() {
    return (
        <Router>
            <nav className="main-navigation">
                <ul>
                    <li>
                        <Link to="/drivers">Drivers</Link>
                    </li>
                    <li>
                        <Link to="/teams">Teams</Link>
                    </li>
                    <li>
                        <Link to="/races">Races</Link>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<Drivers />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/races" element={<Races />} />
                <Route path="/driverDetails/:id" element={<DriversDetails />} />
                <Route path="/teamDetails/:id" element={<TeamsDetails />} />
                <Route path="/raceDetails/:id" element={<RacesDetails />} />

            </Routes>
        </Router>

    )
};