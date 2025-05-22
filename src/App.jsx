import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/system/Box";
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
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
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy"
import Partners from "./components/Partners"
import TearmsOfUse from "./components/TermsOfUse"
import BecomeAnAffiliate from "./components/BecomeAnAffiliate"

export default function App() {
    const [flags, setFlags] = useState([]);
    const [year, setYears] = useState("");

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
                <ul>
                    <li>
                        <TextField
                            id="outlined-basic"
                            value=""
                            variant="outlined"
                            label="Search for..."
                        />
                    </li>
                    <li>
                        <FormControl>
                            <Box sx={{ minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-label">Select a year</InputLabel>
                                <Select sx={{ minWidth: 140 }}></Select>
                            </Box>
                        </FormControl>
                    </li>
                </ul>
            </nav>

            <div className="container">
                <div className="content_wrap">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cardOne" element={<CardOne />} />
                        <Route path="/cardTwo" element={<CardTwo />} />
                        <Route path="/cardThree" element={<CardThree />} />
                        <Route path="/cardFour" element={<CardFour />} />
                        <Route path="/cardFive" element={<CardFour />} />
                        <Route path="/cardSix" element={<CardFour />} />
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