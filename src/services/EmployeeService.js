import axios from "axios";

const REST_API_BASE_URL =
    import.meta.env.VITE_API_URL + "/api/employees";
console.log("🌐 Backend URL:", REST_API_BASE_URL);

export const listEmployees = () => axios.get(REST_API_BASE_URL);
export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);
export const getEmployeeById = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);
export const updateEmployee = (id, employee) => axios.put(`${REST_API_BASE_URL}/${id}`, employee);
export const deleteEmployee = (employeeId) => axios.delete(`${REST_API_BASE_URL}/${employeeId}`);