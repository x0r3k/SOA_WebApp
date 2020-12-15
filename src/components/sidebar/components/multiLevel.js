import React, { useState } from "react";
import { useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from '@material-ui/core/Divider';
import MenuItem from './menuItem';
import { setCurrentCategory } from '../../../redux/reducers/category/categoryActions';
import { useHistory } from 'react-router-dom';

export default function MultiLevel({ item }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const openProductPage = () => {
      dispatch(setCurrentCategory(item));
      history.push(`/products/${item.id}`);
    }
    const { items: children } = item;
    const [open, setOpen] = useState(false);
  
    const handleClick = (event) => {
      event.stopPropagation();
      setOpen((prev) => !prev);
    };
  
    return (
      <React.Fragment>
        <ListItem button onClick={openProductPage} key={item.id}>
          <ListItemText primary={item.name} />
          {open ? <ExpandLessIcon onClick={handleClick} fontSize="large"/> : <ExpandMoreIcon onClick={handleClick} fontSize="large"/>}
        </ListItem>
        <Divider/>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((child, key) => (
              <MenuItem key={key} item={child} />
            ))}
          </List>
          <Divider/>
        </Collapse>
      </React.Fragment>
    );
  };
  