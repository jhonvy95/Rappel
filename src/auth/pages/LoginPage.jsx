import { Google } from "@mui/icons-material";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { startGoogleSingIn, startLoginWithEmailAndPassword } from "../../store/auth";

const formData = {
  email: "email@gmail.com",
  password: "123456",
};

const LoginPage = () => {
  const { status, errorMessage } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formData);
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailAndPassword({ email, password }));
    console.log({ email, password });
  };

  const onGoogleLogin = () => {
    console.log("Google login");
    dispatch(startGoogleSingIn());
  };
  return (
    <form
      aria-label="submit-form"
      onSubmit={onSubmit}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            sx={{ width: "100%" }}
            label="Email"
            type="email"
            placeholder="email@google.com"
            name="email"
            value={email}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            sx={{ width: "100%" }}
            label="Password"
            type="password"
            placeholder="Password"
            name="password"
            inputProps={{
              "data-testid": "password",
            }}
            value={password}
            onChange={onInputChange}
          />
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
            <Alert severity="error">{errorMessage} </Alert>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={isAuthenticating}
              aria-label="google-btn"
              onClick={onGoogleLogin}
              variant="contained"
              fullWidth
            >
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="end">
          {/* <Link component={RouterLink} color="inherit" to="/auth/register">
            Crear una cuenta
          </Link> */}
        </Grid>
      </Grid>
    </form>
  );
};
export default LoginPage;
