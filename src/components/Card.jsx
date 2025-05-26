import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router";

export default function NewsCard(props) {

    return (
        // <div className="card">
        //     <img src={props.image} alt={props.title} />
        //     <h3>{props.title}</h3>
        //     <p>{props.description}</p>
        // </div>
        <div className="card">
            <Link to={"/news/" + props.id}>
                <Card sx={{ maxWidth: 200 }} className='card'>
                    <CardMedia
                        sx={{ height: 100 }}
                        image={props.CardData.image}
                        title={props.CardData.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '15px' }}>
                            {props.CardData.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </div>
    );
}
