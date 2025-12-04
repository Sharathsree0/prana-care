import { useState, useEffect } from "react"; // 1. Import useEffect
import "./Admin.css";

export default function AdminSettings() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // --- 2. LOAD SHORTCUT: Check storage first, if empty, use default list ---
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("adminTodos");
    return saved ? JSON.parse(saved) : [{ id: 1, text: "Review user feedback", completed: false }];
  });

  const [todoInput, setTodoInput] = useState("");
  const [editId, setEditId] = useState(null);

  // --- 3. AUTO-SAVE SHORTCUT: Whenever 'todos' changes, save it ---
  useEffect(() => {
    localStorage.setItem("adminTodos", JSON.stringify(todos));
  }, [todos]);

  // --- EXISTING HANDLERS (Unchanged) ---
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword.length < 4) {
      setMessage("Password must be at least 4 characters ❌");
      return;
    }
    localStorage.setItem("adminPass", newPassword);
    setMessage("Password updated successfully! ✅");
    setNewPassword("");
  };

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;

    if (editId) {
      setTodos(todos.map((t) => (t.id === editId ? { ...t, text: todoInput } : t)));
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: todoInput, completed: false }]);
    }
    setTodoInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const startEdit = (todo) => {
    setTodoInput(todo.text);
    setEditId(todo.id);
  };

  return (
    <section>
      <h2>Settings</h2>

      <div className="settings-container">
        <div className="stat-card">
          <h3>Admin Profile</h3>
          <form className="admin-form" onSubmit={handlePasswordUpdate}>
            <div className="form-group">
              <label>Admin Email</label>
              <input type="email" defaultValue="admin@gmail.com" disabled />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="text"
                placeholder="Enter new password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button className="admin-btn">Update Password</button>
            {message && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{message}</p>}
          </form>
        </div>

        <div className="stat-card">
          <h3>Feedback To-Do List</h3>
          
          <form onSubmit={handleTodoSubmit} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Add new task..."
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              style={{ flex: 1, padding: "8px" }}
            />
            <button type="submit" className="admin-btn" style={{ width: "auto" }}>
              {editId ? "Update" : "Add"}
            </button>
          </form>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#f9f9f9",
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "5px",
                  border: "1px solid #eee"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <span style={{ textDecoration: todo.completed ? "line-through" : "none", color: todo.completed ? "#888" : "#000" }}>
                    {todo.text}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "5px" }}>
                  <button onClick={() => startEdit(todo)} style={{ fontSize: "12px", cursor: "pointer" }}>✏️</button>
                  <button onClick={() => deleteTodo(todo.id)} style={{ fontSize: "12px", cursor: "pointer", color: "red" }}>🗑️</button>
                </div>
              </li>
            ))}
            {todos.length === 0 && <p style={{color: "#888", fontStyle: "italic"}}>No tasks yet...</p>}
          </ul>
        </div>
      </div>
    </section>
  );
}