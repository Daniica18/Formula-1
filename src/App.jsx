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
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Partners from "./components/Partners";
import TermsOfUse from "./components/TermsOfUse";
import CreateAnAccount from "./components/CreateAnAccount";
import Slider1 from "./components/Slider1";
import Slider2 from "./components/Slider2";
import Slider3 from "./components/Slider3";
import Card from "./components/Card";
import CardDetails from "./components/CardDetails";


export default function App() {
    const curentYear = (new Date()).getFullYear() - 1;
    const [flags, setFlags] = useState([]);
    const [years, setYears] = useState([]);
    const [text, setText] = useState("");
    const [year, setYear] = useState(`${curentYear}`);

    const cardData = [
        {
            title: "POWER RANKINGS: Who impressed our judges during an incident-packed weekend at Imola?",
            image: "../img/Card1.jpg",
            description: `Red Bull driver Max Verstappen delivered another masterclass to take victory in the Emilia-Romagna Grand Prix and keep the pressure on his McLaren rivals on Sunday. But who else caught the attention of our judges across an action-packed Imola weekend? Check out the latest Power Rankings scores and overall leaderboard below...
How it works
Our five-judge panel assess each driver after every Grand Prix and score them out of 10 according to their performance across the weekend – taking machinery out of the equation
Our experts’ scores are then averaged out to produce a race score – with those scores then tallied up across the season on our overall Power Rankings Leaderboard (at the bottom of the page)`


        },

        {
            title: "Vasseur admits Ferrari are not fast enough as he highlights Qualifying concerns ahead of Monaco",
            image: "../img/Card2.jpg",
            description: `For many, Ferrari and Formula 1 racing have become inseparable. The only team to have competed in every season since the world championship began, the Prancing Horse has grown from the humble dream of founder Enzo Ferrari to become one of the most iconic and recognised brands in the world.
           Success came quickly through the likes of Alberto Ascari and John Surtees, and continued – in amongst leaner times – with Niki Lauda in the 1970s and then Michael Schumacher in the 2000s, when Ferrari claimed a then unprecedented five consecutive title doubles, securing their status as the most successful and decorated team in F1 history....Team Principal Fred Vasseur’s leadership starts to gel and strong campaign sees Charles Leclerc and Carlos Sainz take five wins between them. Runners-up in the constructors’ standings, losing out to McLaren at the final round. Lewis Hamilton signed to replace Sainz for 2025.`
        },
        {
            title: "TECH WEEKLY: McLaren’s ingenious design is the latest step in a spectacular evolution in rear brake duct design",
            image: "../img/card3.jpg",
            description: `There has been a lot of intrigue recently about how an ingenious McLaren rear brake duct design is helping the MCL39 have better tyre temperature control than the others. At circuits which induce particularly high rear tyre temperatures, it has helped amplify McLaren’s advantage.

Although the exact way the duct is configured internally is not yet widely known, the FIA has checked and confirmed that the design is in full compliance with the regulations and that it has no concerns about it.`
        },

        {
            title: "THIS WEEK IN F1: 10 quiz questions on the Emilia Romagna Grand Prix and F1 history at Monaco",
            image: "../img/Card4.jpg",
            description: `McLaren may well have the fastest overall package this year, but Max Verstappen proved on Sunday that he's in no mood to concede anything to his papaya rivals, pulling off one of the all-time great overtaking moves on pole-sitter Oscar Piastri into Tamburello to take the lead on Lap 1.
That stunning move was the foundation of Verstappen's victory as he raced off at the front, while behind him there was plenty of action – and a surprising amount of overtaking on such a tight track – as the rest of the drivers fought for places.`
        },
        {
            title: "McLaren reveal tweaked ‘Riviera-inspired’ livery for Monaco and Spanish Grands Prix",
            image: "../img/Card5.jpg",
            description: `McLaren have revealed a special ‘Riviera-inspired’ livery enhancement that will run on their Formula 1 cars at the upcoming Monaco and Spanish Grands Prix.

In collaboration with team partner OKX, the livery change is a nod to McLaren’s iconic M7A race car, while “drawing inspiration from the elegance of the Riviera”.

POWER RANKINGS: Who impressed our judges during an incident-packed weekend at Imola?

The M7A was the car with which founder Bruce McLaren claimed the team’s first F1 victory at the 1968 Belgian Grand Prix – as well as being the machine that debuted their now legendary papaya livery.

McLaren’s new design will run on both MCL39s throughout the entirety of the Monaco and Spanish Grand Prix weekends, with drivers Lando Norris and Oscar Piastri also sporting fresh overalls in Monaco.
“We’re always proud to be able to celebrate our storied legacy,” said Louise McEwen, Chief Marketing Officer at McLaren Racing.

“Working with OKX on this latest livery enhancement is a great way to not only celebrate this history, but also the innovation and forward-thinking nature that inspires both McLaren and OKX brands. I can’t wait to see the cars on track over the next two race weekends.”
THIS WEEK IN F1: 10 quiz questions on the Emilia-Romagna Grand Prix and F1 history at Monaco

It is not the first time McLaren have run a bespoke livery in Monaco, with the squad unveiling an Ayrton Senna-inspired design for last year’s Grand Prix on the streets of the Principality.

Before that, they ran a one-off ‘Triple Crown’ papaya, white and black livery at the 2023 event as part of their 60th anniversary celebrations, and in 2021 they brought the blue and orange colours of then partner Gulf Oil back to F1.`
        },

        {
            title: "What time is the Formula 1 2025 Monaco Grand Prix and how can I watch it?",
            image: "../img/Card6.jpg",
            description: `Formula 1 moves swiftly on from Imola to Monte Carlo for the Monaco Grand Prix this weekend, as the latest triple header sequence continues.

The event will begin with Free Practice 1 and Free Practice 2 on Friday, May 23, followed by Free Practice 3 and Qualifying on Saturday, May 24, and the Grand Prix itself on Sunday, May 25.

POWER RANKINGS: Who impressed our judges during an incident-packed weekend at Imola?

Head to the RACE HUB or scroll down for more on how and when you can watch the action, along with the global start times for each session.`
        },
    ];

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
                        <Route path="/" element={<Home cardData={cardData} />} />
                        <Route path="/news/:id" element={<CardDetails cardData={cardData} />} />
                        <Route path="/slider1" element={<Slider1 />} />
                        <Route path="/slider2" element={<Slider2 />} />
                        <Route path="/slider3" element={<Slider3 />} />
                        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                        <Route path="/Partners" element={<Partners />} />
                        <Route path="/TermsOfUse" element={<TermsOfUse />} />
                        <Route path="/CreateAnAccount" element={<CreateAnAccount />} />
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