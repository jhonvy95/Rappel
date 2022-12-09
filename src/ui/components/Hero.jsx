import { useState } from "react";
import Logo from "../../assets/images/LogoJournalApp.png";
import { LoginPage, RegisterPage } from "../../auth";
import Modal from "./Modal";
import NavbarHome from "./NavbarHome";

const Hero = () => {
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const handleOpenModalLogin = () => {
    setOpenModalLogin(true);
  };
  const handleCloseModalLogin = () => {
    setOpenModalLogin(false);
  };
  const handleOpenModalRegister = () => {
    setOpenModalRegister(true);
  };
  const handleCloseModalRegister = () => {
    setOpenModalRegister(false);
  };
  return (
    <section className="hero">
      <NavbarHome
        openModalLogin={handleOpenModalLogin}
        openModalRegister={handleOpenModalRegister}
      />
      <Modal isVisible={openModalRegister} closeModal={handleCloseModalRegister} title="Signup">
        <RegisterPage />
      </Modal>
      <Modal isVisible={openModalLogin} closeModal={handleCloseModalLogin} title="Login">
        <LoginPage />
      </Modal>
      <div className="heroContent">
        <img src={Logo} alt="Logo" width="350rem" />
        <button onClick={handleOpenModalLogin} className="buttonHome">
          Star Your Free Journal Now!
        </button>
      </div>
    </section>
  );
};
export default Hero;
