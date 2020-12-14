import React, { useEffect, useState, Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
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
    top: 64,
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
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let requestBody = {};
    requestBody.uri = '/api/category/getCategories';
    requestBody.method = 'GET';

    axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, requestBody)
    .then(response => setCategories(response.data))
    .catch(error => console.log(error));
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
                  return <MenuItem item={item}/>
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