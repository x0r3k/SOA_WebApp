import React, { useEffect, useState, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../redux/reducers/category/categoryActions';
import axios from 'axios';

import MenuItem from './components/menuItem';

let drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    top: 68,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

export default function SideBar(props) {
  // const { toggleSidebar, openSidebar } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const categories = useSelector(({categoryReducer}) => categoryReducer.category);


  useEffect(() => {
    dispatch(setCategories());
  }, []);


  return (
    <div className={classes.root}>
      <Fragment>
        <Drawer
          anchor={'left'}
          // open={openSidebar}
          // onClose={toggleSidebar}
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerContainer}>
            <List>
              { 
                categories.map(item => {
                  return <MenuItem item={item} key={item.id}/>
                })
              }
            </List>
          </div>
        </Drawer>
      </Fragment>
      <main className={clsx(classes.content)}>
        {props.children}
      </main>
    </div>
  );
}