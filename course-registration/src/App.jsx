
import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Portal home">
          <span className="brand-icon">CR</span>
          <span>Course Registration Portal</span>
        </a>

        <nav className="nav-links">
          <a href="#registration">Register</a>
          <a href="#benefits">Courses</a>
          <a href="#footer">About</a>
        </nav>
      </header>

      <main className="main-layout">
        <aside className="promo-panel" id="benefits">
          <span className="eyebrow">COURSE ADMISSIONS 2026</span>

          <h1>
            Learn new skills. <span>Build your future.</span>
          </h1>

          <p className="promo-description">
            Register for a course that matches your interests and career
            goals. Choose your subject and preferred learning mode to get
            started.
          </p>

          
<div className="learning-illustration" aria-hidden="true">
  <span className="learning-icon">LEARN</span>
  <span className="learning-icon">GROW</span>
</div>

<div className="benefit">
  <div className="benefit-icon">01</div>
  <div>
    <h3>Explore new skills</h3>
    <p>Discover courses across exciting domains.</p>
  </div>
</div>

<div className="benefit">
  <div className="benefit-icon">02</div>
  <div>
    <h3>Learn your way</h3>
    <p>Choose online, offline, or hybrid learning.</p>
  </div>
</div>

<div className="benefit">
  <div className="benefit-icon">03</div>
  <div>
    <h3>Build your future</h3>
    <p>Take the next step toward your goals.</p>
  </div>
</div>

        </aside>

        <section className="form-panel" id="registration">
          <div className="form-heading">
            <div className="heading-icon">SR</div>
            <div>
              <span className="form-eyebrow">STUDENT ENROLMENT</span>
              <h2>Student Registration</h2>
              <p>Fill in your details to register for a course.</p>
            </div>
          </div>

          <RegistrationForm />
        </section>
      </main>

      <footer className="footer" id="footer">
        <p>© 2026 Course Registration Portal</p>
        <span>Developed using ReactJS</span>
      </footer>
    </div>
  );
}
