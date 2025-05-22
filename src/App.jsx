import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/Home"
import SearchForm from "./components/SearchForm"
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
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy"
import Partners from "./components/Partners"
import TearmsOfUse from "./components/TermsOfUse"
import BecomeAnAffiliate from "./components/BecomeAnAffiliate"
import CardFive from "./components/CardFive";
import CardSix from "./components/CardSix";

export default function App() {
    const [flags, setFlags] = useState([]);
    const [years, setYears] = useState([]);

    useEffect(() => {
        getFlags();
        getYears();
    }, []);

    const getFlags = async () => {
        const url = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
        const response = await axios.get(url);
        setFlags(response.data);
    };

    const getYears = () => {
        const curentYear = (new Date()).getFullYear() - 1;
        const minYear = 2000;
        const yearArray = [];
        for (var i = curentYear; i >= minYear; i--) {
            yearArray.push(i)      
        }
        setYears(yearArray)
    };

    return (
        <Router>
            <nav className="main-navigation">
                <ul>
                    <li><Link to="/"><img src="./public/img/logo.png" /></Link></li>
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
                <SearchForm years={years} />
            </nav>

            <div className="container">
                <div className="content_wrap">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cardOne" element={<CardOne />} />
                        <Route path="/cardTwo" element={<CardTwo />} />
                        <Route path="/cardThree" element={<CardThree />} />
                        <Route path="/cardFour" element={<CardFour />} />
                        <Route path="/cardFive" element={<CardFive />} />
                        <Route path="/cardSix" element={<CardSix />} />
                        <Route path="/Contact" element={<Contact />} />
                        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                        <Route path="/Partners" element={<Partners />} />
                        <Route path="/TearmsOfUse" element={<TearmsOfUse />} />
                        <Route path="/BecomeAnAffiliate" element={<BecomeAnAffiliate />} />
                        <Route path="/drivers" element={<Drivers flags={flags} />} />
                        <Route path="/teams" element={<Teams flags={flags} />} />
                        <Route path="/races" element={<Races flags={flags} />} />
                        <Route path="/driverDetails/:id" element={<DriversDetails flags={flags} />} />
                        <Route path="/teamDetails/:id" element={<TeamsDetails flags={flags} />} />
                        <Route path="/raceDetails/:id" element={<RacesDetails flags={flags} />} />
                    </Routes>
                </div>
            </div>

            <Footer />
        </Router>
    )
};