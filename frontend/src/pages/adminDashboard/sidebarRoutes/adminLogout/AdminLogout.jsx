import { useNavigate} from 'react-router-dom';

import {AdminSidebar} from '../AdminSidebar';

export const AdminLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <div className="admin-main-content shrink">
        <div className="admin-content-card">
          <h4>🚪 Confirm Logout</h4>
          <p className="admin-text-muted">Are you sure you want to log out from your admin session?</p>
          <button className="submit-btn" style={{ marginTop: '25px', color:'white' }} onClick={handleLogout}>
            YES, LOG ME OUT
          </button>
        </div>
      </div>
    </div>
  );
};