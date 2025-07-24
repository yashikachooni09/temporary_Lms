import { useEffect, useState } from 'react';

import { AdminSidebar } from './adminSidebarRoutes/AdminSidebar';

import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);


import { AdminLogoutButton } from '../../components/adminLogoutButton/AdminLogoutButton';

import './adminDashboard.css';

export const AdminDashboard = () => {

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem("showWelcome");
    if (justLoggedIn === "true") {
      setShowWelcome(true);
      sessionStorage.removeItem("showWelcome");
    }
  }, []);


  const cardData = [
    { title: 'Total Books', value: 1240, color: '#03045e' },
    { title: 'Issued Books', value: 520, color: '#03045e' },
    { title: 'Returned Books', value: 470, color: '#03045e' },
    { title: 'Overdue Books', value: 75, color: '#03045e' },
  ];

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Books Issued',
        data: [120, 90, 140, 100, 160, 130, 110],
        backgroundColor: '#03045e',
        borderRadius: 6,
      },
      {
        label: 'Books Returned',
        data: [100, 70, 130, 90, 150, 120, 100],
        backgroundColor: '#fca311',
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: ['Issued', 'Returned', 'Available'],
    datasets: [
      {
        data: [520, 470, 250],
        backgroundColor: ['#03045e', '#fca311', '#d5e0ffff'],
        borderWidth: 1,
      },
    ],
  };


  return (
    <>
      <div className="admin-dashboard">
        <AdminSidebar />

        <div className="admin-dashboard-main-content shrink">
          <AdminLogoutButton />

          <div className="admin-dashboard-wrapper">

            <div className="card-container">
              {cardData.map((card, index) => (
                <div className="dashboard-card" key={index} /*style={{ backgroundColor: card.color }}*/>
                  <h4>{card.title}</h4>
                  <p>{card.value}</p>
                </div>
              ))}
            </div>

            <div className="chart-container">
              <div className="bar-chart-section">
                <h4>Monthly Transactions</h4>
                <Bar data={barData} />
              </div>

              <div className="pie-chart-section">
                <h4>Book Status Overview</h4>
                <Pie data={pieData} />
              </div>
            </div>
          </div>
        </div>
      </div >

      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-popup">
            <h2>👋 Welcome to Admin Panel</h2>
            <p>
              You now have full control to manage books, users, and monitor library activity.
              Use the sidebar to navigate between sections.
            </p>
            <button className="thanks-btn" onClick={() => setShowWelcome(false)}>
              Okay
            </button>
          </div>
        </div>
      )
      }
    </>
  );
};