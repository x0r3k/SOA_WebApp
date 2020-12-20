import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setProductsCategoryCar } from '../../redux/reducers/product/productActions';
import { getCurrentCategory } from '../../redux/reducers/category/categoryActions';
import Navbar from '../navbar';
import ProductCard from './productCart';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      margin: 0,
    //   padding: theme.spacing(2)
    },
}));

export default function ProductPage(props) {
    let { id } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const products = useSelector(({productReducer}) => productReducer.products);
    const currentCar = useSelector(({carReducer}) => carReducer.currentCar);


    useEffect(() => {
        dispatch(getCurrentCategory(id));
        if(!currentCar) dispatch(setProducts(id));
        else dispatch(setProductsCategoryCar(id, currentCar.id));
    }, []);

    return (
        <Navbar withCarList>
            <div>
            {   
                products.length 
                ? 
                <Grid container className={classes.root} spacing={2}>
                    {
                        products.map(item => {
                            return (
                                <Grid item xs={3}>
                                    <ProductCard item={item} />
                                </Grid>
                            ) 
                        })
                    }
                </Grid>
                :
                <Typography variant="h3">
                    Products not found
                </Typography>
            }
            </div>
        </Navbar>
    );
};