import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsCard from './Card';
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

            {/* LIVE */}
            <div className="live-wrapper">
                <div className="live">
                    <span className="live-content">
                        🏁🏁🏁 Watch all F1 sessions live with F1 TV. Live Formula 1 Race: Watch now on&nbsp;
                        <Link to="https://www.formula1.com/en-rs/subscribe-to-f1-tv?from=us&to=rs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="live-link"
                        >
                            LIVE STREAM
                        </Link>
                    </span>
                    <span className="live-content">
                        🏁🏁🏁 Watch all F1 sessions live with F1 TV. Live Formula 1 Race: Watch now on&nbsp;
                        <Link to="https://www.formula1.com/en-rs/subscribe-to-f1-tv?from=us&to=rs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="live-link"
                        >
                            LIVE STREAM
                        </Link>
                    </span>

                </div>
            </div>
        </div >
    );
}
