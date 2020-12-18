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
import { removeFromShoppingCart } from '../../redux/reducers/product/productActions';


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
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    }
});

export default function CarListCard (props) {
    const {product} = props; 
    const classes = useStyles();
    const dispatch = useDispatch();

    
    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                <IconButton
                    onClick={() => dispatch(removeFromShoppingCart(product.product.id))}
                >
                    <ClearIcon />
                </IconButton>
                }
                title={product.product.name}
                // subheader="September 14, 2016"
            />
            <CardContent>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    );
}