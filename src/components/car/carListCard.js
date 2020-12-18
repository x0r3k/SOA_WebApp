import react from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    //   display: 'flex',
    //   flexDirection: 'row'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cardStyle: {
        display: 'flex',
        flexDirection: 'row'
    }
  });

export default function CarListCard (props) {
    const {car, deleteCar} = props; 
    const classes = useStyles();

    
    return (
        <Card className={classes.root}>
            <CardContent >
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {`${car.brand} ${car.model} ${car.year}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Set as Current Vehicle</Button>
                <Button size="small" onClick={() => deleteCar(car.id)}>Delete from garage</Button>
            </CardActions>
        </Card>
    );
}