import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

const SideBarItem = ({ note }) => {
  const dispatch = useDispatch();
  const newTitle = useMemo(() => {
    return note.title.length > 17 ? note.title.substring(0, 25) + "..." : note.title;
  }, [note.title]);

  const newNote = {
    id: note.id,
    title: note.title,
    body: note.body,
    date: note.date,
    isNewNote: note.isNewNote,
    imageUrls: note.imageUrls,
  };
  const onClickNote = () => {
    dispatch(setActiveNote(newNote));
  };

  const dateString = useMemo(
    () =>
      new Date(note.date).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    [note.date]
  );
  return (
    <ListItem disablePadding sx={{ borderBottom: "2px solid #CCD1D1" }}>
      <ListItemButton onClick={onClickNote}>
        <Grid container>
          <Grid item>
            <Typography noWrap>{newTitle}</Typography>
          </Grid>
          <Grid container direction="row" sx={{ gap: "1px" }}>
            <ListItemIcon sx={{ mr: "0", minWidth: "10px" }}>
              <TurnedInNot sx={{ width: "20px" }} />
            </ListItemIcon>
            <ListItemText secondary={dateString} sx={{ width: "50%" }} />
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
export default SideBarItem;
