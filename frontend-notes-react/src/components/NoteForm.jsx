function NoteForm({
  title,
  content,
  noteLoading,
  noteError,
  editingNoteId,
  onTitleChange,
  onContentChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />

      <br />
      <br />

      <button type="submit" disabled={noteLoading}>
        {noteLoading
          ? "Saving..."
          : editingNoteId === null
            ? "Create Note"
            : "Update Note"}
      </button>
      {noteError && <p className="error">{noteError}</p>}
    </form>
  );
}

export default NoteForm;
