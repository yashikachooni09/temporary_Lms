import {AdminSidebar} from '../AdminSidebar';

export const ManageBooks = () => {
  return (
    <>
    <div className="admin-dashboard">
      <AdminSidebar />

      <div className="admin-main-content shrink">
        <div className="admin-content-card">
          <h4>🛠️ Manage Books!</h4>
          <p className="admin-text-muted">You're now in the admin dashboard.</p>
        </div>
      </div>
    </div>
    </>
  );
};