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
import TermsOfUse from "./components/TermsOfUse"
import BecomeAnAffiliate from "./components/BecomeAnAffiliate"
import CardFive from "./components/CardFive";
import CardSix from "./components/CardSix";
import Slider1 from "./components/Slider1";
import Slider2 from "./components/Slider2";
import Slider3 from "./components/Slider3";


export default function App() {
    const curentYear = (new Date()).getFullYear() - 1;
    const [flags, setFlags] = useState([]);
    const [years, setYears] = useState([]);
    const [text, setText] = useState("");
    const [year, setYear] = useState(`${curentYear}`);

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
                <div className="logo-container">
                    <Link to="/"><img src="./img/logo.png" className="logo" /></Link>
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
                </div>
                <SearchForm years={years} text={text} year={year} setYear={setYear} setText={setText} />
            </nav>

            <div className="container">
                <div className="content_wrap">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/slider1" element={<Slider1 />} />
                        <Route path="/slider2" element={<Slider2/>} />
                        <Route path="/slider3" element={<Slider3/>} />
                        <Route path="/cardOne" element={<CardOne />} />
                        <Route path="/cardTwo" element={<CardTwo />} />
                        <Route path="/cardThree" element={<CardThree />} />
                        <Route path="/cardFour" element={<CardFour />} />
                        <Route path="/cardFive" element={<CardFive />} />
                        <Route path="/cardSix" element={<CardSix />} />
                        <Route path="/Contact" element={<Contact />} />
                        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                        <Route path="/Partners" element={<Partners />} />
                        <Route path="/TermsOfUse" element={<TermsOfUse />} />
                        <Route path="/BecomeAnAffiliate" element={<BecomeAnAffiliate />} />
                        <Route path="/drivers" element={<Drivers flags={flags} year={year} text={text} />} />
                        <Route path="/teams" element={<Teams flags={flags} year={year} text={text} />} />
                        <Route path="/races" element={<Races flags={flags} year={year} text={text} />} />
                        <Route path="/driverDetails/:id" element={<DriversDetails flags={flags} year={year} text={text} />} />
                        <Route path="/teamDetails/:id" element={<TeamsDetails flags={flags} year={year} text={text} />} />
                        <Route path="/raceDetails/:id" element={<RacesDetails flags={flags} year={year} text={text} />} />
                    </Routes>
                </div>
            </div>

            <Footer />
        </Router>
    )
};