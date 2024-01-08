import { useDispatch } from "react-redux";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { useEffect } from "react";
import noteService from "./services/notes";
import { initializeNotes, setNotes } from "./reducers/noteReducer";
import { AppDispatch } from "./store";

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, []);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
