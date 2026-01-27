function NotesList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return <p className="empty">No notes yet.</p>;
  }

  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <li className="note-card" key={note.id}>
          <div className="note-body">
            <h3 className="note-title">{note.title || "Untitled"}</h3>
            <p className="note-content">{note.content}</p>
          </div>

          <div className="note-actions">
            <button type="button" onClick={() => onEdit(note)}>
              Edit
            </button>
            <button
              type="button"
              className="danger"
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NotesList;
