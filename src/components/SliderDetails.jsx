import { useParams } from "react-router";
import { SliderData } from "../SliderData";

export default function SliderDetails() {
    const params = useParams();

    return (
        <>

            <div className="SliderComponent">
                <h1>{SliderData[params.id].title}</h1>
                <br></br>
                <p>{SliderData[params.id].paragrafOne}</p>
                <br />
                <br></br>
                <img src={SliderData[params.id].image_article} className="imageSl" />
                <br></br>
                <br></br>
                <p>{SliderData[params.id].paragrafTwo}</p>
                <br></br>
                <br />
            </div >
        </>
    )
}