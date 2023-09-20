import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default function SignIn() {
  const [errorsList, setErrorsList] = useState(null);
  const [processForm, setProcessForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setProcessForm(true);
    const data = new FormData(event.currentTarget);
    const inputFieldsObj = {
      email: data.get('email'),
      password: data.get('password'),
    };
    requestAssets.api('auth/login', inputFieldsObj, 'post').then((res) => {
      setProcessForm(false);
      if (res) {
        if (res.status == 422) {
          setShowError(true);
          setErrorsList(res.data.errors);
        }
        if (res.status == 400) {
          setShowError(true);
          console.log("ress", res);
          let resError = {
              message : res.data.message
          };
          setErrorsList(resError);
          console.log(errorsList);
        }
        if (res.status == 200) {
          setShowError(false);
          setErrorsList(null);
          localStorage.setItem('token', res.data.token);
          if (res.data.organizations.length === 1) {
            localStorage.setItem('organization', JSON.stringify(res.data.organizations[0]));
           
          }
          navigate('/dashboard');
        }
      } else {
          const resError = {
              message : "error"
          };
          setErrorsList(resError);
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
            Sign in
          </Typography>
          {
            errorsList && errorsList.message && <Alert severity="error">{errorsList.message}</Alert>
          }
          

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              error={showError}
              required
              fullWidth
              id="email"
              label="Email Address"
              helperText={showError && errorsList.email && errorsList.email[0]}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              error={showError}
              helperText={showError && errorsList.password && errorsList.password[0]}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={processForm}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
