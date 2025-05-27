import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router";
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
import Contact from "./components/Footer/Contact";
import Footer from "./components/Footer/Footer";
import PrivacyPolicy from "./components/Footer/PrivacyPolicy";
import Partners from "./components/Footer/Partners";
import TermsOfUse from "./components/Footer/TermsOfUse";
import CreateAnAccount from "./components/Footer/CreateAnAccount";
import Card from "./components/Card";
import CardDetails from "./components/CardDetails";
import SliderInfo from "./components/SliderInfo";
import SliderDetails from "./components/SliderDetails";


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
                    <NavLink to="/"><img src="./img/logo.png" className="logo" /></NavLink>
                    <ul>
                        <li>
                            <NavLink to="/drivers">Drivers</NavLink>
                        </li>
                        <li>
                            <NavLink to="/teams">Teams</NavLink>
                        </li>
                        <li>
                            <NavLink to="/races">Races</NavLink>
                        </li>
                    </ul>
                </div>
                <SearchForm years={years} text={text} year={year} setYear={setYear} setText={setText} />
            </nav>

            <div className="container">
                <div className="content_wrap">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sliderNews/:id" element={<SliderDetails />} />
                        <Route path="/news/:id" element={<CardDetails />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                        <Route path="/partners" element={<Partners />} />
                        <Route path="/termsOfUse" element={<TermsOfUse />} />
                        <Route path="/createAnAccount" element={<CreateAnAccount />} />
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