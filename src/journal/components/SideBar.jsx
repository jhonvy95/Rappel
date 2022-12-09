import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import {
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";
import SideBarItem from "./SideBarItem";

const SideBar = ({ drawerWidth }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { displayName } = useSelector((store) => store.auth);
  const { notes } = useSelector((store) => store.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredNotes = !search
    ? notes
    : notes.filter((note) => note.title.toLowerCase().includes(search.toLowerCase()));

  const name = displayName?.split(" ")[0];

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="permanent"
        open
        sx={{
          displat: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: "bold" }}>
            {name[0].toUpperCase() + name.substring(1)}'s Journal
          </Typography>
        </Toolbar>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            height: "4rem",
          }}
        >
          <InputBase
            onChange={onSearch}
            sx={{ ml: 1 }}
            placeholder="search journal..."
            inputProps={{ "aria-label": "search journal..." }}
          />

          <SearchIcon />
        </Paper>

        <ListItem disablePadding sx={{ backgroundColor: "#3f51b5", color: "white", pt: 2, pb: 2 }}>
          <ListItemButton onClick={onClickNewNote}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="center">
              <AddCircleRoundedIcon />

              <Typography noWrap component="div" sx={{ ml: 1 }}>
                New Note
              </Typography>
            </Grid>
          </ListItemButton>
        </ListItem>

        <List>
          {filteredNotes.map((note) => (
            <SideBarItem key={note.id} note={note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
export default SideBar;
