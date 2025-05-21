import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from "../components/Footer";
import { Link } from 'react-router';

export default function MediaCard() {
  return (
    <div>
    <div className='Cards'>
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        sx={{ height: 100}}
        image="../public/img/Card1.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize:"15px" }}>
        <Link to="./CardOne">POWER RANKINGS: Who impressed our judges during an incident-packed weekend at Imola?</Link> 
        </Typography>
      </CardContent>
    </Card>

  <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        sx={{ height: 100}}
        image="../public/img/Card2.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize:"15px" }}>
        <Link to="./CardTwo">Vasseur admits Ferrari are not fast enough as he highlights Qualifying concerns ahead of Monaco</Link>
        </Typography>
      </CardContent>
    </Card>

      <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        sx={{ height: 100}}
        image="../public/img/Card3.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize:"15px" }}>
       <Link to="">TECH WEEKLY: McLaren’s ingenious design is the latest step in a spectacular evolution in rear brake duct design</Link>
        </Typography>
      </CardContent>
    </Card>

     <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        sx={{ height: 100}}
        image="../public/img/Card4.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize:"15px" }}>
        <Link to="">THIS WEEK IN F1: 10 quiz questions on the Emilia Romagna Grand Prix and F1 history at Monaco</Link>
        </Typography>
      </CardContent>
    </Card>

    </div>

<div>
    <Footer />
</div>
    </div>



   
  );
}
    
