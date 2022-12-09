const NavbarHome = ({ openModalLogin, openModalRegister }) => {
  return (
    <header>
      <div className="container">
        <div className="contentHeader">
          <button onClick={openModalLogin}>Log in</button>
          <button onClick={openModalRegister}>Sign up</button>
        </div>
      </div>
    </header>
  );
};
export default NavbarHome;
