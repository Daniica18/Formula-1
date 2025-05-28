import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsCard from './Card';
import { CardData } from "../CardData";
import SliderInfo from './SliderInfo';

export default function Home() {

    return (
        <div>
            {/* SLIDER */}
            <div className="slider-container">
                <SliderInfo />
            </div>
            <br></br>
            <div>
                {/* CARDS */}
                <div className="cards">
                    <div>
                        <NewsCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
