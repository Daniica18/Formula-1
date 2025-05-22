import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
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
                        <img src="../public/img/Slider1.jpg" alt="Hit Netfilx Show" />
                        <div className="bottom-left">
                            <h3>Hit Netflix show Drive to Survive picks up prestigious Emmy Award</h3>
                        </div>
                    </div>
                    <div className="slider">
                        <img src="../public/img/Slider2.jpg" alt="Hit Netfilx Show" />
                        <div className="bottom-left">
                            <h3>McLaren reveal tweaked ‘Riviera-inspired’ livery for Monaco and Spanish Grands Prix</h3>
                        </div>
                    </div>
                    <div className="slider">
                        <img src="../public/img/Slider3.png" alt="RACE WEEK" />
                        <div className="bottom-left">
                            <h3>IT’S RACE WEEK: 5 storylines we’re excited about ahead of the Monaco Grand Prix</h3>
                        </div>
                    </div>
                </Slider>
            </div>

            <br></br>


            <div>
                {/* CARDS */}
                <div className="cards">
                    <Card sx={{ maxWidth: 200 }} className='card'>
                        <CardMedia
                            sx={{ height: 100 }}
                            image="../public/img/Card1.jpg"

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "15px" }}>
                                <Link to="./CardOne">POWER RANKINGS: Who impressed our judges during an incident-packed weekend at Imola?</Link>
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ maxWidth: 200 }} className='card'>
                        <CardMedia
                            sx={{ height: 100 }}
                            image="../public/img/Card2.jpg"

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "15px" }}>
                                <Link to="./CardTwo">Vasseur admits Ferrari are not fast enough as he highlights Qualifying concerns ahead of Monaco</Link>
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ maxWidth: 200 }} className='card'>
                        <CardMedia
                            sx={{ height: 100 }}
                            image="../public/img/Card3.jpg"

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "15px" }}>
                                <Link to="./CardThree">TECH WEEKLY: McLaren’s ingenious design is the latest step in a spectacular evolution in rear brake duct design</Link>
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ maxWidth: 200 }} className='card'>
                        <CardMedia
                            sx={{ height: 100 }}
                            image="../public/img/Card4.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "15px" }}>
                                <Link to="./CardFour">THIS WEEK IN F1: 10 quiz questions on the Emilia Romagna Grand Prix and F1 history at Monaco</Link>
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ maxWidth: 200 }} className='card'>
                        <CardMedia
                            sx={{ height: 100 }}
                            image="../public/img/Card5.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "15px" }}>
                                <Link to="./CardFour">McLaren reveal tweaked ‘Riviera-inspired’ livery for Monaco and Spanish Grands Prix</Link>
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ maxWidth: 200 }} className='card'>
                        <CardMedia
                            sx={{ height: 100 }}
                            image="../public/img/Card6.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: "15px" }}>
                                <Link to="./CardFour">McLaren reveal tweaked ‘Riviera-inspired’ livery for Monaco and Spanish Grands Prix</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
