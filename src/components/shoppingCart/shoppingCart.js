import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';

import ShoppingCartCard from './shoppingCartCard';


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



export default function ShoppingCartModal (props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { isOpen, setIsOpen } = props;

    const shoppingCart = useSelector(({productReducer}) => productReducer.shoppingCart);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
        <Dialog 
            open={isOpen} 
            onClose={handleClose} 
            fullWidth={true} 
            maxWidth={'md'}
            scroll={'paper'}
        >
            <DialogTitle id="form-dialog-title">Shopping cart</DialogTitle>
            <DialogContent>
                <Grid container direction="column" spacing={2}>
                {
                    shoppingCart.map(item => {
                        return (
                            <Grid item>
                                <ShoppingCartCard product={item}/>
                            </Grid>
                        )
                    })
                }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Go to order
                </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}