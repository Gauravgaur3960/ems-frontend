import React, { useState } from 'react';
import { createEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const CreateEmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const navigator = useNavigate();

  function validateForm() {
    let valid = true;
    const updatedErrors = {
      firstName: '',
      lastName: '',
      email: '',
    };

    if (!firstName.trim()) {
      updatedErrors.firstName = 'First name is required';
      valid = false;
    }

    if (!lastName.trim()) {
      updatedErrors.lastName = 'Last name is required';
      valid = false;
    }

    if (!email.trim()) {
      updatedErrors.email = 'Email is required';
      valid = false;
    }

    setErrors(updatedErrors);
    return valid;
  }

  function saveEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      createEmployee(employee)
        .then(() => navigator('/employees'))
        .catch((error) => console.error(error));
    }
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
        <h2 className="text-center mb-4 fw-bold" style={{ color: '#000' }}>
          <FaPlus className="me-2" />
          Add New Employee
        </h2>
        <form>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#000' }}>First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
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
              placeholder="Enter last name"
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
              placeholder="Enter email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-success px-4" onClick={saveEmployee}>
              ✅ Save
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

export default CreateEmployeeComponent;
