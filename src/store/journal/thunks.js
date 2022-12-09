import { collection, deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
      isNewNote: true,
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = (uid) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    dispatch(setSaving(true));
    const { uid } = getState().auth;

    const noteToFirestore = { ...note, isNewNote: false };
    delete noteToFirestore.id;
    if (!noteToFirestore.imageUrls) {
      delete noteToFirestore.imageUrls;
    }

    const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await updateDoc(noteRef, noteToFirestore);
    dispatch(updateNote(note));
  };
};

export const startUploadingFile = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving(true));
    // await fileUpload(file[0]);
    const fileUploadPromesis = [];
    for (const file of files) {
      fileUploadPromesis.push(fileUpload(file));
    }
    const photosUrls = await Promise.all(fileUploadPromesis);
    console.log(photosUrls);
    dispatch(setPhotosToActiveNote(photosUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(noteRef);

    dispatch(deleteNoteById(note.id));
  };
};
