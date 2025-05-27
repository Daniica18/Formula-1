import { useParams } from "react-router";
import { CardData } from "../CardData";

export default function CardDetails() {
    const params = useParams();


    return (
        <div>
            <h1>
                {CardData[params.id].title}
            </h1>
            <img src={CardData[params.id].image} alt="" srcset="" />
            <p>
                {CardData[params.id].description}
            </p>
        </div>
    );
};
