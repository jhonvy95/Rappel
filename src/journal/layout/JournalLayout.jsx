import { Box, Toolbar } from "@mui/material";
import WoodImage from "../../assets/images/wooden.jpg";
import { Navbar, SideBar } from "../components";
const drawerWidth = 240;

const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }} className="animate__animated animate__fadeIn animate__faster">
      {/* Navbar */}
      <Navbar drawerWidth={drawerWidth} />
      {/* Sidebar */}
      <SideBar drawerWidth={drawerWidth} />
      <div
        style={{
          width: "100%",
          backgroundImage: `url(${WoodImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Toolbar */}
          <Toolbar />

          {children}
        </Box>
      </div>
    </Box>
  );
};
export default JournalLayout;
