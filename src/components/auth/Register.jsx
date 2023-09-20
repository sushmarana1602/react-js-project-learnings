import { useState } from 'react';
import * as requestAssets from "../../utils/request";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [errorsList, setErrorsList] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [processForm, setProcessForm] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setProcessForm(true);
    const data = new FormData(event.currentTarget);
    const inputFieldsObj = {
      email: data.get('email'),
      password: data.get('password'),
      password_confirmation: data.get('confirmPassword'),
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      terms: data.get('terms')
    };
    requestAssets.api('auth/register', inputFieldsObj, 'post').then((res) => {
      setProcessForm(false);
     if (res.status == 422) {
      setShowError(true);
      setErrorsList(res.data.errors);
     }
    if (res.status == 400) {
      let resError = {
          message : res.data.message
      };
      setShowError(true);
      setErrorsList(resError);
    }
    if (res.status == 200) {
      setErrorsList(null);
      setShowError(false);
      setSuccessMsg(res.data.message);
      event.target.reset();
    }
  });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {
            errorsList && errorsList.message && <Alert severity="error">{errorsList.message}</Alert>
          }
          
          {
            successMsg && <Alert severity="success">{successMsg}</Alert>
          }
          
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={showError}
                  helperText={showError && errorsList.first_name && errorsList.first_name[0]}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  error={showError}
                  helperText={showError && errorsList.last_name && errorsList.last_name[0]}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={showError}
                  helperText={showError && errorsList.email && errorsList.email[0]}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={showError}
                  helperText={showError && errorsList.password && errorsList.password[0]}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl
              required
              error={showError}
              component="fieldset"
              sx={{ m: 3 }}
              variant="standard"
            >
                <FormControlLabel
                  
                  control={<Checkbox value="yes" color="primary" name="terms" />}
                  label="I agree with terms & conditions."
                />
                { showError && errorsList.terms && <FormHelperText>{ errorsList.terms[0] }</FormHelperText> }
                </FormControl>
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={processForm}
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
