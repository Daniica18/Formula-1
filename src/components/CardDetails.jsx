import { useParams } from "react-router";

export default function CardDetails(props) {
    const params = useParams();

    console.log("propsice", props, params)

    return (
        <div>
            <h1>
                {props.cardData[params.id].title}
            </h1>
            <img src={props.cardData[params.id].image} alt="" srcset="" />
            <p>
                {props.cardData[params.id].description}
            </p>
        </div>
    );
};
