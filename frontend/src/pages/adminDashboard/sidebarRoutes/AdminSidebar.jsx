import { useNavigate, useLocation } from 'react-router-dom';
import {
    FaUserPlus, FaBook, FaChartBar,
    FaUserCog, FaSignOutAlt, FaHome
} from 'react-icons/fa';

import './adminSidebar.css';

export const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();


    const handleNavigation = (path) => navigate(path);

    const menuItems = [
        { path: '/admin-dashboard', icon: <FaHome className="icon-md" />, label: 'Dashboard' },
        { path: '/new-admin', icon: <FaUserPlus className="icon-md" />, label: 'New Admin' },
        { path: '/manage-users', icon: <FaUserCog className="icon-md" />, label: 'Manage Users' },
        { path: '/manage-books', icon: <FaBook className="icon-md" />, label: 'Manage Books' },
        { path: '/reports', icon: <FaChartBar className="icon-md" />, label: 'Reports' },
        { path: '/admin-logout', icon: <FaSignOutAlt className="icon-md" />, label: 'Logout' },
    ];

    return (

        <div className="admin-sidebar open">
            <div className="admin-sidebar-header">
                <h5>Admin Panel</h5>
            </div>

            <ul className="admin-sidebar-menu">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleNavigation(item.path)}
                        className={location.pathname === item.path ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};