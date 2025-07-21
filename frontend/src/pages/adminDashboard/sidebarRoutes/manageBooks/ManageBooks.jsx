import { useNavigate } from 'react-router-dom';

import { AdminSidebar } from '../AdminSidebar';

import './manageBooks.css';

export const ManageBooks = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="admin-dashboard">
        <AdminSidebar />

        <div className="admin-manage-books-main-content">

          <div className="manage-books-buttons-section">
            <button
              className="add-book-btn"
              onClick={() => navigate('/add-new-book')}
            >
              Add New Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
};