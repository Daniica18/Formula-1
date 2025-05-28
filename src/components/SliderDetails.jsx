import { useParams } from "react-router";
import { sliderData } from "../helper/SliderData";

export default function SliderDetails() {
    const params = useParams();
    const slide = sliderData[params.id];

    return (
        <>
            <div className="SliderComponent">
                <h1>{slide.title}</h1>
                <br></br>
                <p>{slide.paragrafOne}</p>
                <br />
                <br></br>
                <img src={slide.image_article} className="imageSl" />
                <br></br>
                <br></br>
                <p>{slide.paragrafTwo}</p>
                <br></br>
                <br />
            </div >
        </>
    )
}