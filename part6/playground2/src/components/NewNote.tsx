import { useDispatch } from "react-redux";
import noteService from "../services/notes";
import { createNote } from "../reducers/noteReducer";
import { AppDispatch } from "../store";

const NewNote = () => {
  const dispatch: AppDispatch = useDispatch();

  const addNote = async (event: any) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewNote;
