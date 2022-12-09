import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton, Typography } from "@mui/material";

const Modal = ({ isVisible = false, closeModal, children, title }) => {
  return (
    isVisible && (
      <div className="modal">
        <Grid
          item
          className="box-shadow animate__animated  animate__fadeInDown"
          xs={3}
          sx={{
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            width: { sm: 450 },
            position: "relative",
          }}
        >
          <IconButton onClick={closeModal} sx={{ position: "absolute", top: 3, right: 3 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {title}
          </Typography>

          {children}
        </Grid>
      </div>
    )
  );
};
export default Modal;
