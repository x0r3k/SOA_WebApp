import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';

import { login } from "../../redux/reducers/auth/authActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Login(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: {
      value: '',
      isError: false,
      textError: '',
    },
    password: {
      value: '',
      isError: false,
      textError: '',
    }
  });

  const changFormField = (event) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: { ...form[name], value }
    });
  };

  const submitLogin = () => {
    let validation = {...form};
    let isError = false;

    if(!form.email.value) {
      validation.email = {...validation.email, isError: true, textError: 'Is required'};
      isError = true;
    }
    else if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(form.email.value)) {
      validation.email = {...validation.email, isError: true, textError: 'Wrong email format'};
      isError = true;
    }
    else validation.email = {...validation.email, isError: false, textError: ''};

    if(!form.password.value) {
      validation.password = {...validation.password, isError: true, textError: 'Is required'};
      isError = true;
    }
    else validation.password = {...validation.password, isError: false, textError: ''};
  
    setForm(validation);
    let params = {
      email: form.email.value,
      password: form.password.value,
    };
    if(!isError) {
      return dispatch(login(params));
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={form.email.value||''}
            autoComplete="email"
            onChange={changFormField}
            error = {form.email.isError}
            helperText={form.email.textError}
          />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={form.password.value||''}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={changFormField}
              error = {form.password.isError}
              helperText={form.password.textError}
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}