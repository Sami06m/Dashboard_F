import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) setUsers(JSON.parse(storedUsers));
    const logged = localStorage.getItem("loggedInUser");
    if (logged) setLoggedInUser(JSON.parse(logged));
  };

  const isAdmin = loggedInUser?.role === "admin";

  const filteredUsers = users.filter((user) => {
    if (isAdmin) {
      return (
        user.fname?.toLowerCase().includes(search.toLowerCase()) ||
        user.lname?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return (
        user.fname?.toLowerCase().includes(search.toLowerCase()) ||
        user.lname?.toLowerCase().includes(search.toLowerCase())
      );
    }
  });

  const sortedUsers = [...filteredUsers];
  if (sortConfig) {
    sortedUsers.sort((a, b) => {
      let aVal = a[sortConfig.key] ?? "";
      let bVal = b[sortConfig.key] ?? "";
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return "↕️";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  const toggleStatus = (userId: number) => {
    if (!isAdmin) return;
    const updatedUsers = users.map((u) =>
      u.id === userId ? { ...u, status: u.status === "active" ? "deactive" : "active" } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    loadData();
  };

  const deleteUser = (userId: number) => {
    if (!isAdmin) return;
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((u) => u.id !== userId);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      if (loggedInUser?.id === userId) {
        localStorage.removeItem("loggedInUser");
        navigate("/login");
      } else {
        loadData();
      }
    }
  };

  const editUser = (user: any) => {
    if (!isAdmin) return;
    navigate(`/users/create?edit=${user.id}`, { state: { user } });
  };

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginatedUsers = sortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const cellPadding = isMobile ? "8px 4px" : "12px 8px";
  const paginationButtonStyle = {
    padding: isMobile ? "4px 8px" : "6px 12px",
    borderRadius: "8px",
    border: "1px solid #555",
    background: "#1c1c1c",
    color: "#fff",
    cursor: "pointer",
    fontSize: isMobile ? "12px" : "14px",
  };

  // نمایش برای کاربر معمولی
  if (!isAdmin) {
    return (
      <div style={{ color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
          <h1 style={{ margin: 0, fontSize: isMobile ? "24px" : "28px" }}>Users</h1>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: isMobile ? "8px 12px" : "10px 16px",
              borderRadius: "40px",
              border: "1px solid #333",
              background: "#111",
              color: "#fff",
              width: isMobile ? "180px" : "250px",
            }}
          />
        </div>
        <div style={{ background: "#1c1c1c", padding: isMobile ? "16px" : "24px", borderRadius: "20px", overflowX: "auto" }}>
          {paginatedUsers.length === 0 ? (
            <div style={{ textAlign: "center", color: "#aaa", padding: "40px" }}>No users yet.</div>
          ) : (
            <>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #333" }}>
                    <th style={{ padding: cellPadding, cursor: "pointer" }} onClick={() => requestSort("fname")}>First Name {getSortIcon("fname")}</th>
                    <th style={{ padding: cellPadding, cursor: "pointer" }} onClick={() => requestSort("lname")}>Last Name {getSortIcon("lname")}</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #2a2a2a" }}>
                      <td style={{ padding: cellPadding }}>{user.fname || "-"}</td>
                      <td style={{ padding: cellPadding }}>{user.lname || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "24px", gap: "8px", flexWrap: "wrap" }}>
                  <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} style={paginationButtonStyle}>Previous</button>
                  <span style={{ padding: "6px 12px", background: "#333", borderRadius: "8px", fontSize: isMobile ? "12px" : "14px" }}>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} style={paginationButtonStyle}>Next</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // نمایش برای ادمین
  return (
    <div style={{ color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <h1 style={{ margin: 0, fontSize: isMobile ? "24px" : "28px" }}>Users</h1>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: isMobile ? "8px 12px" : "10px 16px",
              borderRadius: "40px",
              border: "1px solid #333",
              background: "#111",
              color: "#fff",
              width: isMobile ? "180px" : "250px",
            }}
          />
          <button onClick={() => navigate("/users/create")} style={{ background: "#3b82f6", border: "none", padding: isMobile ? "8px 16px" : "10px 24px", borderRadius: "40px", color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: isMobile ? "12px" : "14px" }}>
            + Add User
          </button>
        </div>
      </div>
      <div style={{ background: "#1c1c1c", padding: isMobile ? "16px" : "24px", borderRadius: "20px", overflowX: "auto" }}>
        {paginatedUsers.length === 0 ? (
          <div style={{ textAlign: "center", color: "#aaa", padding: "40px" }}>No users yet. Please signup first.</div>
        ) : (
          <>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #333" }}>
                  <th style={{ padding: cellPadding, cursor: "pointer" }} onClick={() => requestSort("fname")}>First Name {getSortIcon("fname")}</th>
                  <th style={{ padding: cellPadding, cursor: "pointer" }} onClick={() => requestSort("lname")}>Last Name {getSortIcon("lname")}</th>
                  <th style={{ padding: cellPadding, cursor: "pointer" }} onClick={() => requestSort("email")}>Email {getSortIcon("email")}</th>
                  <th style={{ padding: cellPadding, cursor: "pointer" }} onClick={() => requestSort("role")}>Role {getSortIcon("role")}</th>
                  <th style={{ padding: cellPadding, cursor: "pointer" }} onClick={() => requestSort("status")}>Status {getSortIcon("status")}</th>
                  <th style={{ padding: cellPadding }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #2a2a2a" }}>
                    <td style={{ padding: cellPadding }}>{user.fname || "-"}</td>
                    <td style={{ padding: cellPadding }}>{user.lname || "-"}</td>
                    <td style={{ padding: cellPadding }}>{user.email || "-"}</td>
                    <td style={{ padding: cellPadding }}>
                      <span style={{ background: user.role === "admin" ? "#3b82f6" : "#555", padding: "4px 12px", borderRadius: "20px", fontSize: "12px" }}>{user.role || "user"}</span>
                    </td>
                    <td style={{ padding: cellPadding }}>
                      <span onClick={() => toggleStatus(user.id)} style={{ background: user.status === "active" ? "#4caf50" : "#f44336", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", cursor: "pointer" }}>
                        {user.status || "active"}
                      </span>
                    </td>
                    <td style={{ padding: cellPadding }}>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button onClick={() => editUser(user)} style={{ background: "#f59e0b", border: "none", padding: "4px 12px", borderRadius: "20px", color: "#fff", cursor: "pointer", fontSize: "12px" }}>Edit</button>
                        <button onClick={() => deleteUser(user.id)} style={{ background: "#ef4444", border: "none", padding: "4px 12px", borderRadius: "20px", color: "#fff", cursor: "pointer", fontSize: "12px" }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: "24px", gap: "8px", flexWrap: "wrap" }}>
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} style={paginationButtonStyle}>Previous</button>
                <span style={{ padding: "6px 12px", background: "#333", borderRadius: "8px", fontSize: isMobile ? "12px" : "14px" }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} style={paginationButtonStyle}>Next</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Users;