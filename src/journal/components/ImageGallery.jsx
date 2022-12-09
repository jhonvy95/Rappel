import DeleteIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useDispatch } from "react-redux";
import { deletePhotoFromActiveNote } from "../../store/journal/journalSlice";

const ImageGallery = ({ images, editNote, isNewNote }) => {
  const dispatch = useDispatch();
  const deleteImage = (image) => {
    dispatch(deletePhotoFromActiveNote(image));
  };

  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
      {images?.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="imagen de la nota"
            loading="lazy"
          />

          <Fab
            onClick={() => deleteImage(image)}
            size="small"
            color="inherit"
            aria-label="add"
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              backgroundColor: "#ca5f5f7d",
              display: editNote || isNewNote ? "flex" : "none",
            }}
          >
            <DeleteIcon fontSize="small" sx={{ color: pink[700] }} />
          </Fab>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGallery;
