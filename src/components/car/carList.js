import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Navbar from '../navbar';

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
    test: {
        marginLeft: 'auto'
    }

}));

export default function MainPage (props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const garageCars = useSelector(({carReducer}) => carReducer.garageCars);

    return (
        <div>
            <Navbar
                withSidebar={false}
                withCarList={false}
            >
                <div>
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
                                    <Button startIcon={<AddIcon/>} className={classes.test}>
                                        add a vehicle
                                    </Button>
                                </div>

                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Navbar>
        </div>
    )
}