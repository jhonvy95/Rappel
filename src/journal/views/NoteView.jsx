import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import SatelliteOutlinedIcon from "@mui/icons-material/SatelliteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState } from "react";
import { useForm } from "../../hooks";
import { startDeletingNote, startSaveNote, startUploadingFile } from "../../store/journal";
import { setActiveNote } from "../../store/journal/journalSlice";
import { ImageGallery, MenuOptions } from "../components";

const NoteView = () => {
  const [editNote, setEditNote] = useState(false);
  const dispatch = useDispatch();
  const {
    active: { isNewNote },
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((store) => store.journal);
  const { title, body, date, onInputChange, formState } = useForm(note);
  const dateString = useMemo(
    () =>
      new Date(date).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [date]
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire({
        icon: "success",
        title: "Note updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      // Swal.fire("Nota actualizada", messageSaved, "success");
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    setEditNote(false);
    dispatch(startSaveNote(formState));
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFile(target.files));
  };

  const onDelete = async () => {
    await Swal.fire({
      title: "Are you sure you want to delete this note?",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      denyButtonText: `Cancel`,
      confirmButtonColor: "#d33",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(startDeletingNote());
        Swal.fire("Deleted!", "Your note has been deleted", "success");
      } else if (result.isDenied) {
        return;
      }
    });
  };
  return (
    <Grid
      container
      width="90"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: "#ffffff",
        padding: "1.5rem",
        margin: "0 auto",
        borderRadius: "0.5rem",
        boxShadow: "0 0 15px 0 rgba(0,0,0,0.5)",
        maxWidth: "1200px",
      }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ borderBottom: "1px solid #CCD1D1", mb: 1, pb: 1 }}
      >
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <CalendarMonthIcon fontSize="large" />
            <Typography fontSize={30} fontWeight="light">
              {dateString}
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" width="50%" alignItems="center" justifyContent="flex-end">
          <input
            type="file"
            multiple
            onChange={onFileInputChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <Grid item>
            <Button
              disabled={isNewNote ? false : isSaving || !editNote}
              onClick={() => fileInputRef.current.click()}
              variant="outlined"
              startIcon={<SatelliteOutlinedIcon />}
            >
              Image
            </Button>
          </Grid>

          <Grid item sx={{ ml: 2 }}>
            <Button
              disabled={isNewNote ? false : isSaving || !editNote}
              onClick={onSaveNote}
              variant="contained"
              startIcon={<SaveOutlinedIcon />}
              color="success"
            >
              Save now
            </Button>
          </Grid>
          <Grid item sx={{ ml: 2 }}>
            <MenuOptions onDelete={onDelete} setEditNote={setEditNote} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <TextField
          InputProps={{
            readOnly: !editNote && !isNewNote ? true : false,
          }}
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter a title"
          label="Title"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          InputProps={{
            readOnly: !editNote && !isNewNote ? true : false,
          }}
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿What happened today?"
          minRows={5}
          sx={{ border: "none", mb: 1 }}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <ImageGallery images={note.imageUrls} editNote={editNote} isNewNote={isNewNote} />
    </Grid>
  );
};
export default NoteView;
