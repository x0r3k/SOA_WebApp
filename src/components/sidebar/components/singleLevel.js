import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from 'react-router-dom';
import { setCurrentCategory } from '../../../redux/reducers/category/categoryActions';

export default function SingleLevel({ item }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const openProductPage = () => {
      dispatch(setCurrentCategory(item));
      history.push(`/products/${item.id}`);
    }

    return (
      <ListItem button onClick={openProductPage} key={item.id}>
        <ListItemText primary={item.name} />
      </ListItem>
    );
};