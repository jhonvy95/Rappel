import { Alert, Button, Grid, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailAndPassword } from "../../store/auth";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "email must have @"],
  password: [(value) => value.length >= 6, "password must be at least 6 characters"],
  displayName: [(value) => value.length >= 1, "name is required"],
};
const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { status, errorMessage } = useSelector((store) => store.auth);
  const isCheckingAuthentication = useMemo(() => status === "checking", [status]);
  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailAndPassword(formState));
  };
  return (
    <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            sx={{ width: "100%" }}
            label="Full Name"
            type="text"
            placeholder="Full Name"
            name="displayName"
            value={displayName}
            onChange={onInputChange}
            error={!!displayNameValid && formSubmitted}
            helperText={displayNameValid}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            sx={{ width: "100%" }}
            label="Email"
            type="email"
            placeholder="email@google.com"
            name="email"
            value={email}
            onChange={onInputChange}
            error={!!emailValid && formSubmitted}
            helperText={emailValid}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            sx={{ width: "100%" }}
            label="password"
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
            error={!!passwordValid && formSubmitted}
            helperText={passwordValid}
          />
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
            <Alert severity="error">{errorMessage} </Alert>
          </Grid>
          <Grid item xs={12}>
            <Button disabled={isCheckingAuthentication} type="submit" variant="contained" fullWidth>
              Crear cuenta
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
export default RegisterPage;
