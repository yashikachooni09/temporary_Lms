import { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { FaBars, FaTimes, FaUserPlus, FaBook, FaChartBar, FaUserCog, FaSignOutAlt, FaHome, FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import './adminDashboard.css';

export const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <Button variant="link" onClick={toggleSidebar} className="toggle-btn">
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </Button>
        <div className="sidebar-header">
          <h5 className="mb-0">Admin Panel</h5>
        </div>
        <ul className="sidebar-menu">
          <li onClick={() => handleNavigation('/admin-dashboard')}>
            <FaHome /> <span>Dashboard</span>
          </li>
          <li onClick={() => handleNavigation('/admin-signup')}>
            <FaUserPlus /> <span>Add Admin</span>
          </li>
          <li><FaUserCog /> <span>Manage Users</span></li>
          <li><FaBook /> <span>Manage Books</span></li>
          <li><FaVideo /> <span>E-Content</span></li>
          <li><FaChartBar /> <span>Reports</span></li>
          <li><FaSignOutAlt /> <span>Logout</span></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'shrink' : 'expand'}`}>
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Card className="p-4 shadow" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
            <h4>🛠️ Welcome to Admin Dashboard!</h4>
            <p className="text-muted mt-2">You're now in the admin dashboard.</p>
          </Card>
        </Container>
      </div>
    </div>
  );
};
