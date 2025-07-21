import {AdminSidebar} from '../AdminSidebar';

export const Reports = () => {
  return (
    <>
    <div className="admin-dashboard">
      <AdminSidebar />

      <div className="admin-main-content shrink">
        <div className="admin-content-card">
          <h4>🛠️ Daily reports!</h4>
          <p className="admin-text-muted">You're now in the admin dashboard.</p>
        </div>
      </div>
    </div>
    </>
  );
};