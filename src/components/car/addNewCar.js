import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import axios from 'axios';

import { setAvaliableCars } from '../../redux/reducers/car/carActions';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    formControl1: {
        margin: theme.spacing(1),
        minWidth: 200,
      },
}));



export default function AddNewCar(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {isOpen, setIsOpen, setIsAdded} = props;
    const selectParams = useSelector(({carReducer}) => carReducer.selectParams);
    const avaliableCars = useSelector(({carReducer}) => carReducer.avaliableCars);
    const garageCars = useSelector(({carReducer}) => carReducer.garageCars);
    const [filterParams, setFilterParams] = useState({
        year: '',
        brand: '',
        model: '',
        engineCapacity: '',
        engineType: ''
    });
    
    const handleSelectChange = (event) => {
        const {name, value} = event.target;
        setFilterParams({
          ...filterParams,
          [name]: value
        });
    }

    const handleClose = () => {
        setIsOpen(false);
        setFilterParams({
            year: '',
            brand: '',
            model: '',
            engineCapacity: '',
            engineType: ''
        });
    };

    useEffect(() => {
        dispatch(setAvaliableCars(filterParams, selectParams));
    }, [filterParams, garageCars]);

    useEffect(() => {
        if(avaliableCars.length === 1 && isOpen) {
            let requestBody = {};
            requestBody.uri = `/api/car/addToGarage/${avaliableCars[0].id}`;
            requestBody.method = 'POST';
            requestBody.headers = {
                Authorization: `Bearer ${localStorage.accessToken}`,
            }
            const response = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, { ...requestBody });
            response
            .then(() => {
                setIsAdded(true);
                handleClose();
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [avaliableCars]);

    return (
        <div>
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth={'md'}>
            <DialogTitle id="form-dialog-title">Add new Vehicle</DialogTitle>
            <DialogContent>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="year"
                        value={filterParams.year || ""}
                        onChange={handleSelectChange}
                        autoWidth
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {
                            selectParams.year.map(item => {
                                return <MenuItem value={item}>{item}</MenuItem>
                            })
                        }   
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Brand</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disabled={!Boolean(filterParams.year)}
                        name="brand"
                        value={filterParams.brand || ""}
                        onChange={handleSelectChange}
                        autoWidth
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {
                            selectParams.brand.map(item => {
                                return <MenuItem value={item}>{item}</MenuItem>
                            })
                        }  
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Model</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        disabled={!Boolean(filterParams.brand)}
                        name="model"
                        value={filterParams.model || ""}
                        onChange={handleSelectChange}
                        autoWidth
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {
                            selectParams.model.map(item => {
                                return <MenuItem value={item}>{item}</MenuItem>
                            })
                        }  
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl1}>
                    <InputLabel id="demo-simple-select-helper-label">Engine Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterParams.engineType || ""}
                        disabled={!Boolean(filterParams.model)}
                        name="engineType"
                        onChange={handleSelectChange}
                        autoWidth
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {
                            selectParams.engineType.map(item => {
                                return <MenuItem value={item}>{item}</MenuItem>
                            })
                        } 
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl1}>
                    <InputLabel id="demo-simple-select-helper-label">Engine Capacity</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterParams.engineCapacity || ""}
                        disabled={!Boolean(filterParams.engineType)}
                        name="engineCapacity"
                        onChange={handleSelectChange}
                        autoWidth
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {
                            selectParams.engineCapacity.map(item => {
                                return <MenuItem value={item}>{item}</MenuItem>
                            })
                        } 
                    </Select>
                </FormControl>
            </DialogContent>
        </Dialog>
        </div>
    );
}