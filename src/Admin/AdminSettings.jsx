import { useState, useEffect } from "react";
import "./Admin.css";
import dbs from "../firebase"; // your Firestore helper

export default function AdminSettings() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [editId, setEditId] = useState(null);

  const [companyPhone, setCompanyPhone] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");

  // ------------------------------
  // 1. LOAD PASSWORD & TODOs
  // ------------------------------
  const loadPhone = async () => {
    const data = await dbs.readDocument("admin_settings", "phone");
    if (data) {
      setCompanyPhone(data.phone);
    } else {
      await dbs.addDocument("admin_settings", "phone", { phone: "+91 9092630929" });
      setCompanyPhone("+91 9092630929");
    }
  };

  const loadPassword = async () => {
    const data = await dbs.readDocument("admin_settings", "auth");
    if (data) {
      // we don't show password, but doc must exist
    } else {
      await dbs.addDocument("admin_settings", "auth", {
        email: "admin@gmail.com",
        password: "1234"
      });
    }
  };

  const loadTodos = async () => {
    const data = await dbs.readCollection("admin_todos");
    setTodos(data);
  };

  useEffect(() => {
    loadPassword();
    loadTodos();
    loadPhone();
  }, []);

  // ------------------------------
  // 2. UPDATE PASSWORD
  // ------------------------------
  const handlePhoneUpdate = async (e) => {
    e.preventDefault();

    if (!companyPhone.trim()) {
      setPhoneMsg("Phone number cannot be empty ❌");
      return;
    }

    await dbs.updateOrSetDocument("admin_settings", "phone", {
      phone: companyPhone
    });

    setPhoneMsg("Phone number updated successfully! ✅");
    setTimeout(() => setPhoneMsg(""), 2000);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (newPassword.length < 4) {
      setMessage("Password must be at least 4 characters ❌");
      return;
    }

    await dbs.updateOrSetDocument("admin_settings", "auth", {
      password: newPassword
    });

    setMessage("Password updated successfully! ✅");
    setNewPassword("");
  };

  // ------------------------------
  // 3. ADD / UPDATE TODO
  // ------------------------------
  const handleTodoSubmit = async (e) => {
    e.preventDefault();
    if (!todoInput.trim()) return;

    if (editId) {
      // Update existing task
      await dbs.updateDocument("admin_todos", String(editId), {
        text: todoInput
      });
      setEditId(null);
    } else {
      // Add new task
      const id = Date.now().toString();
      await dbs.addDocument("admin_todos", id, {
        id,
        text: todoInput,
        completed: false
      });
    }

    setTodoInput("");
    loadTodos();
  };

  // ------------------------------
  // 4. DELETE TODO
  // ------------------------------
  const deleteTodo = async (id) => {
    await dbs.deleteDocument("admin_todos", String(id));
    loadTodos();
  };

  // ------------------------------
  // 5. TOGGLE TODO STATUS
  // ------------------------------
  const toggleTodo = async (id) => {
    const item = todos.find((t) => t.id === id);
    await dbs.updateDocument("admin_todos", String(id), {
      completed: !item.completed
    });
    loadTodos();
  };

  const startEdit = (todo) => {
    setTodoInput(todo.text);
    setEditId(todo.id);
  };

  return (
    <section>
      <h2>Settings</h2>

      <div className="settings-container">

        {/* PASSWORD CARD */}
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

            {message && (
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                {message}
              </p>
            )}
          </form>
        </div>
        {/* PHONE NUMBER CARD */}
        <div className="stat-card">
          <h3>Company Phone Number</h3>

          <form className="admin-form" onSubmit={handlePhoneUpdate}>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="+91 90926 30929"
                required
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
              />
            </div>

            <button className="admin-btn">Update Phone</button>

            {phoneMsg && (
              <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                {phoneMsg}
              </p>
            )}
          </form>
        </div>

        {/* TODO CARD */}
        <div className="stat-card">
          <h3>Feedback To-Do List</h3>

          <form
            onSubmit={handleTodoSubmit}
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px"
            }}
          >
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
                  <span
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "#888" : "#000"
                    }}
                  >
                    {todo.text}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => startEdit(todo)}
                    style={{ fontSize: "12px", cursor: "pointer" }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    style={{ fontSize: "12px", cursor: "pointer", color: "red" }}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}

            {todos.length === 0 && (
              <p style={{ color: "#888", fontStyle: "italic" }}>
                No tasks yet...
              </p>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
