import {
  loginWithEmailAndPassword,
  logoutFiraBase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../../src/firebase/providers";
import {
  checkingAuthentication,
  startCreatingUserWithEmailAndPassword,
  startGoogleSingIn,
  startLoginWithEmailAndPassword,
  startLogout,
} from "../../../src/store/auth";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/providers");

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe invocar el checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSingIn debe de llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData);

    //Thunk
    await startGoogleSingIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSingIn debe de llamar checkingCredentials y logout - Error", async () => {
    const loginData = { ok: false, errorMessage: "Error al iniciar sesión" };
    await signInWithGoogle.mockResolvedValue(loginData);

    //Thunk
    await startGoogleSingIn()(dispatch);
    // expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startCreatingUserWithEmailAndPassword debe llamar checkingCredentials y login - Exito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };

    await registerUserWithEmailAndPassword.mockResolvedValue(loginData);

    //tkunk
    await startCreatingUserWithEmailAndPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startCreatingUserWithEmailAndPassword debe llamar checkingCredentials y logout - Error", async () => {
    const loginData = { ok: false, errorMessage: "Error al iniciar sesión" };
    const formData = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };

    await registerUserWithEmailAndPassword.mockResolvedValue(loginData);

    //tkunk
    await startCreatingUserWithEmailAndPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startLoginWithEmailAndPassword debe de llamar checkingCredentials y login exito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formdata = { email: demoUser.email, password: "123456" };

    await loginWithEmailAndPassword.mockResolvedValue(loginData);

    //thunk
    await startLoginWithEmailAndPassword(formdata)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startLoginWithEmailAndPassword debe de llamar checkingCredentials y logout Error", async () => {
    const loginData = { ok: false, errorMessage: "Error al iniciar sesión" };
    const formdata = { email: demoUser.email, password: "123456" };

    await loginWithEmailAndPassword.mockResolvedValue(loginData);

    //thunk
    await startLoginWithEmailAndPassword(formdata)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startLogout debe de llamar checkingCredentials,logoutFiraBase,clearNotesLout y logout ", async () => {
    await startLogout()(dispatch);
    expect(logoutFiraBase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
