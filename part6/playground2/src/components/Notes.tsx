import { useDispatch, useSelector } from "react-redux";
import { INote, toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes";

const Note = ({ note }: { note: INote }) => {
  const dispatch = useDispatch();

  const toggleImportanceOfNote = async (
    id: string,
    boolImportance: boolean
  ) => {
    const newNote = await noteService.update(id, {
      important: !boolImportance,
    });
    dispatch(toggleImportanceOf(newNote));
  };

  return (
    <li onClick={() => toggleImportanceOfNote(note.id, note.important)}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const notes = useSelector(
    ({ filter, notes }: { filter: string; notes: INote[] }) => {
      if (filter === "ALL") {
        return notes;
      }
      return filter === "IMPORTANT"
        ? notes.filter((note) => note.important)
        : notes.filter((note) => !note.important);
    }
  );

  return (
    <ul>
      {notes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </ul>
  );
};

export default Notes;
