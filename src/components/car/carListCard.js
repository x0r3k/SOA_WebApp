import react from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { setCurrentCar } from '../../redux/reducers/car/carActions';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    //   display: 'flex',
    //   flexDirection: 'row'
    },
    selectedCard: {
      borderLeft: '5px solid orange'
    },
    title: {
      fontSize: 14,
    },
  });

export default function CarListCard (props) {
    const {car, deleteCar, isSelected} = props; 
    const classes = useStyles();
    const dispatch = useDispatch();

    
    return (
        <Card className={clsx(classes.root, {[classes.selectedCard]: isSelected})}>
            <CardContent >
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {`${car.brand} ${car.model} ${car.year}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => dispatch(setCurrentCar(car))}>Set as Current Vehicle</Button>
                <Button size="small" onClick={() => deleteCar(car.id)}>Delete from garage</Button>
            </CardActions>
        </Card>
    );
}