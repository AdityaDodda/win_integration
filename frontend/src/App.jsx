// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';
import Navbar from './components/Navbar';
import CreateJob from './components/CreateJob';
import CreatePracticeQuestion from './components/CreatePracticeQuestion';
import GetJobs from './components/GetJobs';
import GetPracticeQuestions from './components/GetPracticeQuestions';
import GetCourses from './components/GetCourses';
import CourseAction from './components/CourseAction';
import BlogListing from './components/BlogListing';
import CreateBlog from './components/CreateBlog';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  // Check local storage for userRole on page load
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setUserRole(role);
    }
  }, []);

  // Handle login by setting the user role and storing in localStorage
  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);  // Store user role in localStorage
  };

  // Handle logout by removing user role from localStorage
  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('userRole');
  };

  return (
    <Router>
      <Navbar userRole={userRole} onLogout={handleLogout} /> {/* Pass logout function to Navbar */}

      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Admin Routes */}
        {userRole === 'admin' && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/create-practice-question" element={<CreatePracticeQuestion />} />
            <Route path="/course-action" element={<CourseAction />} />
          </>
        )}

        {/* Student Routes */}
        {userRole === 'student' && (
          <>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/get-jobs" element={<GetJobs />} />
            <Route path="/get-practice-questions" element={<GetPracticeQuestions />} />
            <Route path="/get-courses" element={<GetCourses />} />
            <Route path="/blogs" element={<BlogListing />} />
            <Route path="/create-blog" element={<CreateBlog />} />
          </>
        )}

        {/* Default Route */}
        <Route
          path="*"
          element={
            userRole ? <Navigate to={`/${userRole}-dashboard`} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;