import React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsCard from './Card';

export default function Home(props) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToScroll: 1,
        pauseOnHover: true,
    };




    return (
        <div>
            {/* SLIDER */}

            <div className="slider-container">
                <Slider {...settings}>
                    <div className="slider">
                        <img src="../img/Slider1.png" alt="Hit Netfilx Show" />
                        <div className="bottom-left">
                            <Link to="Slider1">
                                <h3>Hit Netflix show Drive to Survive picks up prestigious Emmy Award</h3>
                            </Link>
                        </div>
                    </div>
                    <div className="slider">
                        <img src="../img/f1celeb.jpg" alt="Formula 1" />
                        <div className="bottom-left">
                            <Link to="Slider2">
                                <h3>For many, Ferrari and Formula 1 racing have become inseparable.</h3>
                            </Link>
                        </div>
                    </div>
                    <div className="slider">
                        <img src="../img/Slider3.png" alt="RACE WEEK" />
                        <div className="bottom-left">
                            <Link to="Slider3">
                                <h3>IT’S RACE WEEK: 5 storylines we’re excited about ahead of the Monaco Grand Prix</h3>
                            </Link>
                        </div>
                    </div>
                </Slider>
            </div>

            <br></br>


            <div>
                {/* CARDS */}
                <div className="cards">
                    <div className="card-container">
                        {props.cardData.map((card, i) => (
                            <NewsCard id={i} card={card} className="card" />
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}
