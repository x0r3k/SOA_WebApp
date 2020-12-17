import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AddIcon from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ExitToApp } from '@material-ui/icons';
import { setGarageCars, clearReducer } from '../redux/reducers/car/carActions';
import { logout } from '../redux/reducers/auth/authActions';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      // padding: theme.spacing(0, 1),
    },
  },
  button: {
    margin: theme.spacing(1),
    fontSize: 20,
  },
  toolbar: {
    minHeight: 64,
  },
}));

export default function Navbar(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(({authReducer}) => authReducer.user);
  const garageCars = useSelector(({carReducer}) => carReducer.garageCars);

  useEffect(() => {
    if(user) {
      dispatch(setGarageCars());
    }
  }, []);

  const { withSidebar } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    console.log(openSidebar);
    setOpenSidebar(!openSidebar);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCarList = () => {
    console.log('FUNCTION');
    if(!garageCars || !garageCars.length) {
      console.log("IF")
      history.push('/car');
    }
  }

  const menuId = 'primary-search-account-menu';
  const renderUnauthMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=> history.push('/login') }>Login</MenuItem>
      <MenuItem onClick={()=> history.push('/register') }>Register</MenuItem>
    </Menu>
  );

  const renderAuthMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={ () => {
        dispatch(logout());
        dispatch(clearReducer());
        handleMenuClose();
      } }>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          { 
            withSidebar && 
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
          }
          
          <Typography className={classes.title} variant="h6" noWrap>
            AutoShop
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          {
            props.withCarList &&           
            <Button
                edge="end"
                color="inherit"
                className={classes.button}
                size='large'
                onClick={handleCarList}
              >
                <DriveEtaIcon fontSize="large"/>
                  Add new car
                <AddIcon fontSize="large"/>
            </Button>
          }
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <ShoppingCartIcon fontSize="large"/>
            </IconButton>
            <IconButton 
              aria-label="show 17 new notifications" 
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              {
                user ? <AccountCircle fontSize="large"/> : <ExitToApp fontSize="large"/>
              }
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      { user ? renderAuthMenu : renderUnauthMenu}
      { React.cloneElement(props.children) }
    </div>
  );
}
