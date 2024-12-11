import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage';
import { CalendarPage } from '../calendar/pages/CalendarPage';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  // const authStatus = 'not-authenticated'; //'not-authenticated';

  console.log(`AppRouter status: ${status}`);
  

  // useEffect(() => {
  //   checkAuthToken();
  // }, [])
  

  return (
    <Routes>
      {
        status === 'authenticated'
          ? (
            <>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/*" element={<Navigate to='/' />} />
            </>
            
          )
          : (
            <>
              <Route path="/auth/*" element={<LoginPage />} />
              <Route path="/*" element={<Navigate to='/auth/login' />} />
            </>
          )
      }

      
    </Routes>
  )
}
