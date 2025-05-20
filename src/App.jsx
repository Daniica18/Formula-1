import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriversDetails from "./components/DriversDetails";

export default function App() {
    return (
        <Router>
            <nav className="main-navigation">
                <ul>
                    <li>
                        <Link to="/">Drivers</Link>
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
                <Route path="/" element={< Drivers />} />
                <Route path="/teams" element={< Teams />} />
                <Route path="/races" element={< Races />} />
                {/* <Route path="/details/:id" element={<DriversDetails />} /> */}
                {/* <Route path="/teams/details/:id" element={<TeamsDetails />} /> */}
                <Route path="/races/details/:id" element={<RacesDetails />} />

            </Routes>
        </Router>

    )
};