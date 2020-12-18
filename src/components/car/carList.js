import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Navbar from '../navbar';
import CarListCard from './carListCard';
import AddNewCar from './addNewCar';
import { setGarageCars, setAvaliableCars } from '../../redux/reducers/car/carActions';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      margin: 0,
    },
    carListWrapper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        background: '#f7f7ff',
        display: 'flex',
        flexDirection: 'column'
    },
    flex: {
        display: 'flex',
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    floatRight: {
        marginLeft: 'auto'
    }

}));

export default function MainPage (props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const garageCars = useSelector(({carReducer}) => carReducer.garageCars);
    const [openModal, setOpenModal] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [cars, setCars] = useState([]);

    const deleteCar = (carId) => {
        let requestBody = {};
        requestBody.uri = `/api/car/removeFromGarage/${carId}`;
        requestBody.method = 'DELETE';
        requestBody.headers = {
            Authorization: `Bearer ${localStorage.accessToken}`,
        }
        const response = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, { ...requestBody });
        response
          .then((res) => {
            setCars(cars.filter((el) => el.id !== carId));
          })
          .catch((error) => {
              console.log(error);
          });
      }
  
    useEffect(() => {
        setCars(garageCars);
    }, [garageCars])

    useEffect(() => {
        dispatch(setGarageCars());
    }, [isAdded]);

    return (
        <div>
            <AddNewCar isOpen={openModal} setIsOpen={setOpenModal} setIsAdded={setIsAdded} />
            <Navbar
                withSidebar={false}
                withCarList={false}
            >
                    <Grid container className={classes.root} spacing={2}>
                        <Grid item xs={8} >
                            <Paper 
                                className={classes.carListWrapper}
                                variant="outlined"
                            >   
                                <div className={classes.flexRow}>
                                    <Typography variant="h4" color='textPrimary'>
                                        <b>MY</b> VEHICLES
                                    </Typography>
                                    <Button 
                                        startIcon={<AddIcon/>} 
                                        className={classes.floatRight}
                                        onClick={() => {
                                            setOpenModal(true);
                                            setIsAdded(false);
                                        }}
                                    >
                                        add a vehicle
                                    </Button>
                                </div>
                                <Grid container direction="column" spacing={2}>
                                    {
                                        cars.map(item => {
                                            return (
                                                <Grid item>
                                                    <CarListCard deleteCar={deleteCar} car={item}/>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
            </Navbar>
        </div>
    )
}