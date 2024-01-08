import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/notes";
import { Dispatch } from "redux";

export interface INote {
  id: string;
  content: string;
  important: boolean;
}

const noteSlice = createSlice({
  name: "notes",
  initialState: [] as INote[],
  reducers: {
    toggleImportanceOf(state, action) {
      const result = action.payload;
      return state.map((note) => (note.id !== result.id ? note : result));
    },
    appendNote(state, action) {
      return state.concat(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch: Dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content: INote) => {
  return async (dispatch: Dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  };
};

export default noteSlice.reducer;
