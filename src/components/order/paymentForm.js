import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function PaymentForm() {
  const [value, setValue] = React.useState(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              <FormControlLabel value="female" control={<Radio />} label="Online" />
              <FormControlLabel value="male" control={<Radio />} label="Cash" />
              <FormControlLabel value="other" control={<Radio />} label="Check payemnt" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}