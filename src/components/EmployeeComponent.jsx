import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '' });

  const { id } = useParams(); // Optional param
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployeeById(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const validateForm = () => {
    let valid = true;
    const errorsCopy = {};

    if (!firstName.trim()) {
      errorsCopy.firstName = 'First name is required';
      valid = false;
    }

    if (!lastName.trim()) {
      errorsCopy.lastName = 'Last name is required';
      valid = false;
    }

    if (!email.trim()) {
      errorsCopy.email = 'Email is required';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      if (id) {
        updateEmployee(id, employee)
          .then(() => navigator('/employees'))
          .catch((err) => console.error(err));
      } else {
        createEmployee(employee)
          .then(() => navigator('/employees'))
          .catch((err) => console.error(err));
      }
    }
  };

  const pageTitle = () =>
    id ? (
      <h2 className="text-center mb-4 text-primary fw-bold">🔄 Update Employee</h2>
    ) : (
      <h2 className="text-center mb-4 text-primary fw-bold">✨ Add New Employee</h2>
    );

  return (
    <div className="container-fluid page-background mt-5">
      <div className="row justify-content-center">
        <div className="glass-card col-md-6 shadow-lg rounded p-4">
          {pageTitle()}
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold text-success">First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className={`form-control shadow-sm rounded-pill ${
                    errors.firstName ? 'is-invalid' : ''
                  }`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold text-success">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className={`form-control shadow-sm rounded-pill ${
                    errors.lastName ? 'is-invalid' : ''
                  }`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold text-success">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className={`form-control shadow-sm rounded-pill ${
                    errors.email ? 'is-invalid' : ''
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-success shadow px-4">
                  ✅ {id ? 'Update' : 'Save'}
                </button>
                <button
                  type="button"
                  className="btn btn-danger shadow px-4"
                  onClick={() => navigator('/employees')}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
