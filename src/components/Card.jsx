import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router";
import { CardData } from "../CardData";

export default function NewsCard() {

    return (
        // <div className="card">
        //     <img src={props.image} alt={props.title} />
        //     <h3>{props.title}</h3>
        //     <p>{props.description}</p>
        // </div>
        <div className="card">
            {CardData.map((card) => (
            <Link to={"/news/" + card.id} key={card.id}>
                <Card sx={{ maxWidth: 200 }} className='card'>
                    <CardMedia
                        sx={{ height: 100 }}
                        image={card.image}
                        title={card.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '15px' }}>
                            {card.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
            ))}
        </div>
    );
}
