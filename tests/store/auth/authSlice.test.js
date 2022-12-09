import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import {
  authenticated,
  demoUser,
  initialState,
  notAuthenticated,
} from "../../fixtures/authFixtures";

describe("Pruebas en el authSlice", () => {
  test("debe de regresar el estado inicial y llamarse auth", () => {
    expect(authSlice.name).toBe("auth");
    const state = authSlice.reducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("debe de realizar la autenticacion", () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual({
      status: "authenticated",
      uid: demoUser.uid,
      email: demoUser.email,
      displayName: demoUser.displayName,
      photoURL: demoUser.photoURL,
      errorMessage: null,
    });
  });

  test("debe realizar el logout sin argumentos", () => {
    const stateLogout = authSlice.reducer(authenticated, logout());
    expect(stateLogout).toEqual(notAuthenticated);
  });
  test("debe realizar el logout y mostrar un mensaje de error", () => {
    const stateLogout = authSlice.reducer(
      authenticated,
      logout({ errorMessage: "Error al cerrar sesión" })
    );
    console.log(stateLogout);
    expect(stateLogout).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: "Error al cerrar sesión",
    });
  });

  test("debe de cambiar el estado a checking", () => {
    const stateChecking = authSlice.reducer(authenticated, checkingCredentials());
    console.log(stateChecking);
    expect(stateChecking.status).toBe("checking");
  });
});
