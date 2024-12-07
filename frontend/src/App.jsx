import React, { useState } from 'react';
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
  const [userRole, setUserRole] = useState(null);  // Keep track of user role in state

  // Handle login by setting the user role in state
  const handleLogin = (role) => {
    setUserRole(role);  // Set the role when login is successful
  };

  // Handle logout by clearing user role from state
  const handleLogout = () => {
    setUserRole(null);  // Clear the user role when logging out
  };

  return (
    <Router>
      {/* Only render Navbar if the user is logged in */}
      {userRole && <Navbar userRole={userRole} onLogout={handleLogout} />}

      <Routes>
        {/* Login Route - Do not render Navbar here */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Admin Routes - Only accessible if userRole is 'admin' */}
        {userRole === 'admin' && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/create-practice-question" element={<CreatePracticeQuestion />} />
            <Route path="/course-action" element={<CourseAction />} />
          </>
        )}

        {/* Student Routes - Only accessible if userRole is 'student' */}
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

        {/* Default Route - Redirect to login if no userRole is set */}
        <Route
          path="*"
          element={userRole ? <Navigate to={`/${userRole}-dashboard`} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;