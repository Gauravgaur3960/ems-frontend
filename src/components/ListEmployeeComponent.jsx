import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    listEmployees()
      .then((response) => {
        console.log("🚩 API Response:", response.data);
        setEmployees(response.data.employees ?? response.data); // ✅ Safe fallback
      })
      .catch((error) => console.error("Error fetching employees:", error));
  };
  

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id)
        .then(() => {
          getAllEmployees(); // Refresh list after delete
        })
        .catch((error) => console.error("Error deleting employee:", error));
    }
  };

  const goToCreate = () => navigate("/add-employee");

  const goToEdit = (id) => navigate(`/edit-employee/${id}`);

  return (
    <div className="container mt-5 page-background">
      <div className="glass-card p-4">
        <h2 className="text-center mb-4">📋 Employee List</h2>

        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-success" onClick={goToCreate}>
            ➕ Add Employee
          </button>
        </div>

        <table className="table table-striped table-dark table-hover rounded">
          <thead>
            <tr>
              <th>👤 ID</th>
              <th>🧍 First Name</th>
              <th>🧍 Last Name</th>
              <th>📧 Email</th>
              <th>⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => goToEdit(emp.id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(emp.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
