import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/Home"
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriversDetails from "./components/DriversDetails";
import TeamsDetails from "./components/TeamsDetails";
import RacesDetails from "./components/RacesDetails";
import CardOne from "./components/CardOne";
import CardTwo from "./components/CardTwo";
import CardThree from "./components/CardThree";
import CardFour from "./components/CardFour";
import Contact from "./components/Contact";

export default function App() {
    const [flags, setFlags] = useState([]);

    useEffect(() => {
        getFlags();
    }, []);

    const getFlags = async () => {
        const url = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
        const response = await axios.get(url);
        setFlags(response.data);
        console.log(response.data);
    };

    return (
        <Router>
            <nav className="main-navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
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
                <Route path="/" element={<Home />} />
                <Route path="/cardOne" element={<CardOne />} />
                <Route path="/cardTwo" element={<CardTwo />} />
                <Route path="/cardThree" element={<CardThree />} />
                <Route path="/cardFour" element={<CardFour />} />
                <Route path="/drivers" element={<Drivers flags={flags} />} />
                <Route path="/teams" element={<Teams flags={flags} />} />
                <Route path="/races" element={<Races flags={flags} />} />
                <Route path="/driverDetails/:id" element={<DriversDetails flags={flags} />} />
                <Route path="/teamDetails/:id" element={<TeamsDetails flags={flags} />} />
                <Route path="/raceDetails/:id" element={<RacesDetails flags={flags} />} />
            </Routes>

            <footer>
                <Link to="/Contact">Contact</Link>
                <Link to="/PrivacyPolicy">Privacy Policy</Link>
                <Link to="/Partners">Partners</Link>
                <Link to="/TermsOfUse">Terms of use</Link>
                <Link to="/BecomeAnAffiliate">Become an affiliate</Link>
            </footer>

        </Router>


    )
};