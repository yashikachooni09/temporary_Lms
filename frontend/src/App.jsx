import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { StudentSignUp } from './pages/studentDashboard/studentSignup/StudentSignup.jsx';
import { StudentLogin } from './pages/studentDashboard/studentLogin/StudentLogin.jsx';
import { AdminLogin } from './pages/adminDashboard/adminLogin/AdminLogin.jsx';
import { Home } from './pages/home/Home.jsx';
import { About } from './pages/about/About.jsx';
import { Rules } from './pages/rules/Rules.jsx';

import { Books } from './pages/books/Books.jsx';
import {BookDetail} from './pages/bookdetails/BookDetail.jsx';

import { ContactUs } from './pages/contactUs/ContactUs.jsx'
import { ForgotPassword } from './pages/forgotPassword/ForgotPassword.jsx';
import { OtpVerify } from './pages/otpVerify/OtpVerify.jsx';
import { ResetPassword } from './pages/resetPassword/ResetPassword.jsx';
import { NotFound } from './pages/notFound/NotFound.jsx';

import { AdminDashboard } from './pages/adminDashboard/adminDashboard.jsx';
import { AdminProfile } from './pages/adminDashboard/sidebarRoutes/adminProfile/AdminProfile.jsx';
import { NewAdmin } from './pages/adminDashboard/sidebarRoutes/newAdmin/NewAdmin.jsx';
import { NewAdminLogin } from './pages/adminDashboard/sidebarRoutes/newAdmin/newAdminLogin/NewAdminLogin.jsx';
import { ManageUsers } from './pages/adminDashboard/sidebarRoutes/manageUsers/ManageUsers.jsx';
import { ManageBooks } from './pages/adminDashboard/sidebarRoutes/manageBooks/ManageBooks.jsx';
import { AddNewBook } from './pages/adminDashboard/sidebarRoutes/manageBooks/addNewBook/AddNewBook.jsx';
import { Reports } from './pages/adminDashboard/sidebarRoutes/reports/Reports.jsx';
import { AdminLogout } from './pages/adminDashboard/sidebarRoutes/adminLogout/AdminLogout.jsx';



import { StudentDashboard } from './pages/studentDashboard/StudentDashboard.jsx';


import { Header } from './components/header/Header.jsx';
import { Footer } from './components/footer/Footer.jsx';
import { ScrollToTop } from './components/scrollToTop/ScrollToTop.jsx';

import './App.css';

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />

          <Route path="/books" element={<Books />} />
          <Route path="/book-details/:id" element={<BookDetail />} />

          <Route path="/student-login" element={<StudentLogin />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path="/student-signup" element={<StudentSignUp />} />
      
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />


          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/new-admin" element={<NewAdmin />} />
          <Route path="/new-admin-login" element={<NewAdminLogin />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-books" element={<ManageBooks />} />
          <Route path="/add-new-book" element={<AddNewBook />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin-logout" element={<AdminLogout />} />

          <Route path="/student-dashboard" element={<StudentDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </Router>
    </>
  );
}

export default App;