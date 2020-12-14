import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from "@material-ui/core/FormHelperText";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MomentUtils from "@date-io/moment";
import moment from 'moment';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useDispatch, useSelector } from 'react-redux';

import { register } from "../../redux/reducers/auth/authActions";

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
  formControl: {
    width: `100%`,
    minWidth: 120,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: {
      value: '',
      isError: false,
      textError: '',
    },
    lastname: {
      value: '',
      isError: false,
      textError: '',
    },
    email: {
      value: '',
      isError: false,
      textError: '',
    },
    password: {
      value: '',
      isError: false,
      textError: '',
    },
    gender: {
      value: '',
      isError: false,
      textError: '',
    },
    birthdate: {
      value: null,
      isError: false,
      textError: '',
    },
    city: {
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

  const changeFormDate = (value, name) => {
    setForm({
      ...form,
      [name]: { ...form[name], value }
    });
  }

  const submitRegister = () => {
    let validation = {...form};
    let isError = false;
    if(!form.name.value) {
      validation = {...validation, name: { ...validation.name, isError: true, textError: 'Is required'}};
      isError = true;
    }
    else validation = {...validation, name: { ...validation.name, isError: false, textError: ''}};

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
    else if(!/^[a-zA-Z0-9]{8,50}$/.test(form.password.value)) {
      validation.password = {...validation.password, isError: true, textError: 'Wrong password format'};
      isError = true;
    }
    else validation.password = {...validation.password, isError: false, textError: ''};

    if(!form.gender.value) {
      validation.gender = {...validation.gender, isError: true, textError: 'Is required'};
      isError = true;
    }
    else validation.gender = {...validation.gender, isError: false, textError: ''};

    if(!form.birthdate.value) {
      validation.birthdate = {...validation.birthdate, isError: true, textError: 'Is required'};
      isError = true;
    }
    else validation.birthdate = {...validation.birthdate, isError: false, textError: ''};

    if(!form.city.value) {
      validation.city = {...validation.city, isError: true, textError: 'Is required'};
      isError = true;
    }
    else validation.city = {...validation.city, isError: false, textError: ''};
  
    setForm(validation);
    let params = {
      email: form.email.value,
      password: form.password.value,
      passwordConfirm: form.password.value,
      name: form.name.value,
      lastname: form.lastname.value || undefined,
      gender: form.gender.value,
      birthdate: new Date(form.birthdate.value).getTime(),
      city: form.city.value,
      role: [3]
    };
    if(!isError) {
      return dispatch(register(params));
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
          Sign up
        </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                value={form.name.value||''}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={changFormField}
                error = {form.name.isError}
                helperText={form.name.textError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastname"
                value={form.lastname.value||''}
                autoComplete="lname"
                onChange={changFormField}
                error = {form.lastname.isError}
                helperText={form.lastname.textError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={form.email.value||''}
                autoComplete="email"
                onChange={changFormField}
                error = {form.email.isError}
                helperText={form.email.textError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <FormControl 
                error = {form.password.isError}
                variant="outlined" 
                fullWidth={true}
              >
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  variant="outlined"
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                  value={form.gender.value||''}
                  autoComplete="gender"
                  onChange={changFormField}
                  error = {form.gender.isError}
                >
                  <MenuItem value='M'>Male</MenuItem>
                  <MenuItem value='F'>Female</MenuItem>
                  <MenuItem value='NB'>Non binary</MenuItem>
                </Select>
                <FormHelperText>{form.gender.textError}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    fullWidth
                    variant="inline"
                    inputVariant="outlined"
                    id="date-picker-dialog"
                    label="Birthdate"
                    format="DD/MM/yyyy"
                    name="birthdate"
                    required
                    value={form.birthdate.value}
                    onChange={(e) => changeFormDate(e, 'birthdate')}
                    error = {form.birthdate.isError}
                    helperText={form.birthdate.textError}
                  />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="city"
                value={form.city.value||''}
                label="City"
                id="city"
                autoComplete="city"
                onChange={changFormField}
                error = {form.city.isError}
                helperText={form.city.textError}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitRegister}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}