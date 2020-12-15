import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  cardActions: {

  }
});

export default function ProductCard({item}) {
  const classes = useStyles();
  let url = 'https://picsum.photos';
  let width = 400;
  let height = 300;
  let imageUrl = `${url}/${width}/${height}?t=${Date.now()}`;
  return (
    <Card className={classes.root}>
        <CardMedia
          component="img"
          alt="Product photo"
          height="140"
          image={imageUrl}
          title="Product photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Product description
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
            <Button size="small" color="primary">
                Add to shopping cart
            </Button>
        </CardActions>
    </Card>
  );
}
