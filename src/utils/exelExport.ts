import * as XLSX from "xlsx";

export const exportUsersToExcel = (users: any[]) => {

  const worksheetData = users.map((user) => ({
    "First Name": user.fname || "",
    "Last Name": user.lname || "",
    Email: user.email || "",
    Gender: user.gender || "",
    Age: user.age || "",
    Role: user.role === "admin" ? "Admin" : "User",
    Status: user.status === "active" ? "Active" : "Deactive",
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  
  const columnWidths = [
    { wch: 15 }, // First Name
    { wch: 15 }, // Last Name
    { wch: 25 }, // Email
    { wch: 10 }, // Gender
    { wch: 8 },  // Age
    { wch: 10 }, // Role
    { wch: 10 }, // Status
  ];
  worksheet["!cols"] = columnWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
  
  XLSX.writeFile(workbook, `users_${new Date().toISOString().slice(0, 19)}.xlsx`);
};