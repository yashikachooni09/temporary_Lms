import { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import {
  FaBars, FaTimes, FaUser, FaBookReader, FaVideo, FaFileAlt, FaBell, FaSignOutAlt, FaHome,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import './studentDashboard.css';

export const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <Button variant="link" onClick={toggleSidebar} className="toggle-btn">
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </Button>
        <div className="sidebar-header">
          <h5 className="mb-0">Student <br />Panel</h5>
          
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => handleNavigation('/student-dashboard')}>
            <FaHome /> <span>Dashboard</span>
          </li>
          <li onClick={() => handleNavigation('/student-profile')}>
            <FaUser /> <span>My Profile</span>
          </li>
          <li onClick={() => handleNavigation('/student-books')}>
            <FaBookReader /> <span>My Books</span>
          </li>
          <li onClick={() => handleNavigation('/student-econtent')}>
            <FaVideo /> <span>E-Content</span>
          </li>
          <li onClick={() => handleNavigation('/student-results')}>
            <FaFileAlt /> <span>Results</span>
          </li>
          <li onClick={() => handleNavigation('/student-notices')}>
            <FaBell /> <span>Notices</span>
          </li>
          <li><FaSignOutAlt /> <span>Logout</span></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'shrink' : 'expand'}`}>
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Card className="p-4 shadow" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
            <h4>🎓 Welcome to Student Dashboard!</h4>
            <p className="text-muted mt-2">You're now in your student dashboard.</p>
          </Card>
        </Container>
      </div>
    </div>
  );
};