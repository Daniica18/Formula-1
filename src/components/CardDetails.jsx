import { useParams } from "react-router";
import { cardData } from "../helper/CardData";

export default function CardDetails() {
    const params = useParams();
    const card = cardData[params.id];

    return (
        <div className="card-content">
            <h1>
                {card.title}
            </h1>
            <img src={card.image} alt="" srcset="" />
            <p className="description">
                {card.description}
            </p>
        </div>
    );
};
