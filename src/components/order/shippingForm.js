import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

export default function AddressForm() {
    const [value, setValue] = React.useState(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="city"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="street"
            name="street"
            label="Street"
            fullWidth
            autoComplete="street"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="h_number"
            name="h_number"
            label="House number"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="app_number"
            name="app_number"
            label="Appartment number"
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12} md={6}>
            <FormControl component="fieldset">
                <RadioGroup aria-label="shipping_type" name="shipping_type" value={value} onChange={handleChange}>
                <FormControlLabel value="female" control={<Radio />} label="Courier" />
                <FormControlLabel value="male" control={<Radio />} label="Mail pickup" />
                <FormControlLabel value="other" control={<Radio />} label="Store pickup" />
                </RadioGroup>
            </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}