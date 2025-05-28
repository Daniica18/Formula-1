import { useParams } from "react-router";
import { CardData } from "../helper/CardData";

export default function CardDetails() {
    const params = useParams();


    return (
        <div className="card-content">
            <h1>
                {CardData[params.id].title}
            </h1>
            <img src={CardData[params.id].image} alt="" srcset="" />
            <p className="description">
                {CardData[params.id].description}
            </p>
        </div>
    );
};
