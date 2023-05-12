import React, { useState } from "react";
import "./App.css";
import CreateNote from "./components/CreateNote";
import Notes from "./components/Notes";
export interface NoteType {
  id: string;
  title: string;
  description: string;
  created_at: moment.Moment;
  modified_at: moment.Moment;
}

const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [editId, setEditId] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <CreateNote
        notes={notes}
        setNotes={setNotes}
        editId={editId}
        setSearchTerm={setSearchTerm}
        setEditId={setEditId}
      />
      <Notes
        notes={notes}
        setEditId={setEditId}
        setNotes={setNotes}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default App;
