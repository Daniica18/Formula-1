import { Link } from 'react-router';
import Slider from "react-slick";
import { SliderData } from "../helper/SliderData";

export default function SliderInfo() {

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
        <Slider {...settings}>
            {SliderData.map((slider) => (
                <div className="slider" key={slider.id}>
                    <img src={slider.image_slide} alt="Hit Netfilx Show" />
                    <div className="bottom-left">
                        <Link to={"/sliderNews/" + slider.id}>
                            <h3>{slider.title}</h3>
                        </Link>
                    </div>
                </div>
            ))
            }
        </Slider>
    );
}