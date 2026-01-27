import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import NotesForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import "./App.css";

function App() {
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupMessage, setSignupMessage] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  const [authError, setAuthError] = useState("");
  const [noteError, setNoteError] = useState("");

  const [authLoading, setAuthLoading] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [notes, setNotes] = useState([]);

  const isDisabled = !email || password.length < 6;

  const API_BASE = import.meta.env.VITE_API_BASE;

  async function fetchNotes() {
    const res = await fetch(`${API_BASE}/notes`, {
      credentials: "include",
    });
    if (!res.ok) return;
    const data = await res.json();
    setNotes(data.notes);
  }

  async function handleAuth(e) {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    const res = await fetch(`${API_BASE}/auth/${authMode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setAuthError(data.message);
      setAuthLoading(false);
      return;
    }

    if (authMode === "signup") {
      setAuthMode("login");
      setPassword("");
      setAuthLoading(false);
      setSignupMessage(true);
      return;
    }

    setIsAuthenticated(true);
    fetchNotes();
    setAuthLoading(false);
  }

  async function handleCreateOrUpdateNote(e) {
    e.preventDefault();

    if (!content) {
      setNoteError("Note content is required");
      return;
    }

    setNoteLoading(true);
    setNoteError("");

    try {
      const url =
        editingNoteId === null
          ? `${API_BASE}/notes`
          : `${API_BASE}/notes/${editingNoteId}`;

      const method = editingNoteId === null ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setNoteError(data.message);
        return;
      }

      // clear inputs
      setEditingNoteId(null);
      setTitle("");
      setContent("");

      // Refresh notes
      fetchNotes();
    } catch (err) {
      setNoteError("Server error");
    } finally {
      setNoteLoading(false);
    }
  }

  function handleEditNote(note) {
    setEditingNoteId(note.id);
    setTitle(note.title || "");
    setContent(note.content);
  }

  async function handleDeleteNote(noteId) {
    setNoteError("");

    try {
      const res = await fetch(`${API_BASE}/notes/${noteId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setNoteError(data.message || "Failed to delete note");
        return;
      }

      // Re-fetch notes after deletion
      fetchNotes();
    } catch (err) {
      setNoteError("Unable to delete note");
    }
  }

  async function handleLogout() {
    setAuthError("");
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
    } finally {
      setSignupMessage(false);
      setIsAuthenticated(false);
      setNotes([]);
      setEmail("");
      setPassword("");
    }
  }

  // Persistent login on refresh the page
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(true);
          fetchNotes();
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    }

    checkAuth();
  }, []);

  if (checkingAuth) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return (
      <div className="app">
        <div className="card">
          <LoginForm
            email={email}
            password={password}
            authError={authError}
            authLoading={authLoading}
            signupMessage={signupMessage}
            authMode={authMode}
            onModeChange={setAuthMode}
            isDisabled={isDisabled}
            onEmailchange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleAuth}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Your Notes</h1>

      <div className="card">
        <NotesForm
          title={title}
          content={content}
          noteLoading={noteLoading}
          noteError={noteError}
          editingNoteId={editingNoteId}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSubmit={handleCreateOrUpdateNote}
        />
      </div>

      <div className="card">
        <NotesList
          notes={notes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
        />
      </div>

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default App;
