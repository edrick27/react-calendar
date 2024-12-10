import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { checking, clearErrorMessage, OnLoadingError, onLogin, OnLogout, OnLogoutCalendar } from "../store";

export const useAuthStore = () => {

  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(state => state.auth);

  const startLogin = async ({email, password}) => {

    dispatch( checking() );

    console.log("startLogin", email, password);

    try {

      const { data } = await calendarApi.post("/auth", {email, password});
      const user = { name: data.name, uid: data.uid };

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      localStorage.setItem('user', JSON.stringify(user));

      dispatch( onLogin(user) );

    } catch (error) {

      console.log("startLogin error", error);
      
    
      dispatch( OnLoadingError("Credenciales incorrectas") );
      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 1000);

    }
  }

  const startRegister = async ({email, password, name}) => {

    dispatch( checking() );

    try {

      const { data } = await calendarApi.post("/auth/new", {email, password, name});
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch( onLogin({ name }) );
      
    } catch (error) {
      dispatch( OnLoadingError(error.response.data?.message) );
      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 1000);
    }

  }

  const checkAuthToken = async () => {
      
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
    
      if (!token) {
        dispatch( OnLogout() );
        return;
      }

      dispatch( onLogin(JSON.parse(user)) );
  
      try {

        const { data } = await calendarApi.get("/auth/renew");
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        
      } catch (error) {
        localStorage.clear();
        dispatch( OnLogout() );
      }
  }

  const startLogout = () => {
    localStorage.clear();
    dispatch( OnLogout() );
    dispatch( OnLogoutCalendar() );
  }

  return {
    status, 
    user, 
    errorMessage,

    // Actions
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  };
}
