import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
  // active: {
  //   id: "123",
  //   title: "",
  //   body: "",
  //   date: 123456789,
  //   imageUrls: []
  // }
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.active = payload;
      state.messageSaved = "";
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: (state, { payload }) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return payload;
        } else {
          return note;
        }
      });

      state.messageSaved = `${payload.title} actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, { payload }) => {
      state.active.imageUrls = [...state.active.imageUrls, ...payload];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, { payload }) => {
      state.notes = state.notes.filter((note) => note.id !== payload);
      state.active = null;
    },
    deletePhotoFromActiveNote: (state, { payload }) => {
      state.active.imageUrls = state.active.imageUrls.filter((imageUrl) => imageUrl !== payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  savingNewNote,
  clearNotesLogout,
  setPhotosToActiveNote,
  deletePhotoFromActiveNote,
} = journalSlice.actions;
export default journalSlice.reducer;
