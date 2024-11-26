import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice';
import Sidebar from '../components/Sidebar';
import logo from '../assets/logo.png';
import io from 'socket.io-client';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = useCallback(async () => {
    try {
      const URL = `${process.env.REACT_APP_PRODUCTION_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true
      });

      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/email"); // Redirect to email verification if the user is logged out
        return;
      }

      dispatch(setUser(response.data.data));
    } catch (error) {
      console.error("Error fetching user details:", error);
      navigate("/email"); // If error occurs, send user back to email verification
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If token is missing, redirect to email verification page
      navigate("/email");
      return;
    }

    fetchUserDetails();
  }, [fetchUserDetails, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const socketConnection = io(process.env.REACT_APP_PRODUCTION_BACKEND_URL, {
        auth: { token }
      });

      dispatch(setSocketConnection(socketConnection));

      socketConnection.on('onlineUser', (data) => {
        dispatch(setOnlineUser(data));
      });

      return () => {
        socketConnection.disconnect();
        dispatch(setSocketConnection(null));
      };
    }
  }, [dispatch]);

  const basePath = location.pathname === '/';
  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
        <div>
          <img
            src={logo}
            width={250}
            alt='logo'
          />
        </div>
        <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
      </div>
    </div>
  );
};

export default Home;
