import React, { useEffect, useState } from 'react';
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
    const {isOpen, setIsOpen} = props;
    const [cars, setCars] = useState([]);
    const [filterParams, setFilterParams] = useState({
        year: '',
        brand: '',
        model: '',
        engineCapacity: '',
        engineType: ''
    });
    const [selectValues, setSelectValues] = useState({
        year: [],
        brand: [],
        model: [],
        engineCapacity: [],
        engineType: []
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
    };

    const getCars = async () => {
        let requestBody = {};
        requestBody.uri = '/api/car/getCarByParams';
        requestBody.method = 'GET';
        let queryString = [];
        let result = '';
        Object.keys(filterParams).forEach(item => {
            if(filterParams[item]) queryString.push(`${item}=${filterParams[item]}`);
            result = queryString.join('&');
        });
        if(result) requestBody.uri += `?${result}`;
    
        try {
            const response = await axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, { ...requestBody });
            if (response.data.foundedCars.length === 1) {
                console.log('One founded car');
                let requestBody_1 = {};
                requestBody_1.uri = '/api/car/getCarByParams';
                requestBody_1.method = 'GET';
            }
            setCars(response.data.foundedCars);
            setSelectValues({
                year: filterParams.year ? selectValues.year : response.data.searchParams.year,
                brand: filterParams.brand ? selectValues.brand : response.data.searchParams.brand,
                model: filterParams.model ? selectValues.model : response.data.searchParams.model,
                engineType: filterParams.engineType ? selectValues.engineType : response.data.searchParams.engineType,
                engineCapacity: filterParams.engineCapacity ? selectValues.engineCapacity : response.data.searchParams.engineCapacity,
            });
        } catch (error) {
            return console.log(error);
        }
    }

    useEffect(() => {
        getCars();
    }, [filterParams]);

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
                            selectValues.year.map(item => {
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
                            selectValues.brand.map(item => {
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
                            selectValues.model.map(item => {
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
                            selectValues.engineType.map(item => {
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
                            selectValues.engineCapacity.map(item => {
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