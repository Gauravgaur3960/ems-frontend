import React, { useState, useEffect } from 'react';
import { getEmployeeById, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const navigator = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getEmployeeById(id)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function updateEmployeeDetails(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const employee = { firstName, lastName, email };
    updateEmployee(id, employee)
      .then(() => navigator('/employees'))
      .catch((error) => console.error(error));
  }

  function cancel() {
    navigator('/employees');
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'transparent',
        fontFamily: "'Segoe UI', 'Roboto', sans-serif",
      }}
    >
      <div
        className="col-md-6 p-4 rounded"
        style={{
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        <h2 className="text-center fw-bold mb-4" style={{ color: '#000' }}>
          🔄 Update Employee
        </h2>
        <form>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#000' }}>First Name</label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: '#000' }}>Last Name</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ color: '#000' }}>Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-success px-4" onClick={updateEmployeeDetails}>
              ✅ Update
            </button>
            <button className="btn btn-secondary px-4" onClick={cancel}>
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeComponent;
