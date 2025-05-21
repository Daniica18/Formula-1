import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <div>
    
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        sx={{ height: 100}}
        image="../public/img/Card1.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize:"15px" }}>
        POWER RANKINGS: Who impressed our judges during an incident-packed weekend at Imola?
        </Typography>
      </CardContent>
    </Card>

  <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        sx={{ height: 100}}
        image="../public/img/Card1.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize:"15px" }}>
        POWER RANKINGS: Who impressed our judges during an incident-packed weekend at Imola?
        </Typography>
      </CardContent>
    </Card>

    </div>
  );
}
    
