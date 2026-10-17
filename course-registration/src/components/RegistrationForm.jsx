
import React, { useState } from "react";
import "./RegistrationForm.css";

const initialData = {
  name: "",
  email: "",
  phone: "",
  course: "",
  mode: "",
};

const courses = [
  "Web Development",
  "Data Science",
  "Machine Learning",
  "Cloud Computing",
  "Cyber Security",
];

const modes = ["Online", "Offline", "Hybrid"];

export default function RegistrationForm() {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess(false);
  };

  const submit = (e) => {
    e.preventDefault();
    const err = {};

    if (data.name.trim().length < 3)
      err.name = "Enter at least 3 characters for your name.";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      err.email = "Enter a valid email address.";

    if (!/^[6-9]\d{9}$/.test(data.phone))
      err.phone = "Enter a valid 10-digit Indian mobile number.";

    if (!data.course) err.course = "Please select a course.";
    if (!data.mode) err.mode = "Please select a study mode.";

    setErrors(err);
    setSuccess(Object.keys(err).length === 0);
  };

  const reset = () => {
    setData({ ...initialData });
    setErrors({});
    setSuccess(false);
  };

  const field = (name, label, placeholder, type = "text") => (
    <div className="form-group" key={name}>
      <label htmlFor={name}>{label} *</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={data[name]}
        onChange={(e) => {
          if (name !== "phone" || /^\d{0,10}$/.test(e.target.value))
            change(e);
        }}
        maxLength={name === "phone" ? 10 : undefined}
        inputMode={name === "phone" ? "numeric" : undefined}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <p className="error" id={`${name}-error`}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  const dropdown = (name, label, options, prompt) => (
    <div className="form-group" key={name}>
      <label htmlFor={name}>{label} *</label>
      <select
        id={name}
        name={name}
        value={data[name]}
        onChange={change}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      >
        <option value="">{prompt}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {errors[name] && (
        <p className="error" id={`${name}-error`}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form className="registration-form" onSubmit={submit} noValidate>
      {field("name", "Full Name", "Enter your full name")}

      <div className="form-row">
        {field("email", "Email Address", "example@email.com", "email")}
        {field("phone", "Mobile Number", "10-digit mobile number", "tel")}
      </div>

      {dropdown("course", "Select Course", courses, "-- Choose a course --")}
      {dropdown("mode", "Preferred Study Mode", modes, "-- Choose study mode --")}

      <div className="button-group">
        <button className="submit-btn" type="submit">Register Now</button>
        <button className="reset-btn" type="button" onClick={reset}>
          Reset Form
        </button>
      </div>

      {success && (
        <div className="success-message" role="status" aria-live="polite">
          <h3>Registration Confirmed!</h3>
          <p>
            Thank you, <strong>{data.name.trim()}</strong>! You registered
            for <strong>{data.course}</strong>.
          </p>
          <p><strong>Email:</strong> {data.email.trim()}</p>
          <p><strong>Mobile:</strong> {data.phone}</p>
          <p><strong>Study Mode:</strong> {data.mode}</p>
        </div>
      )}
    </form>
  );
}
