import { useAuthStore } from "../../hooks"


export const Navbar = () => {

    const { user, startLogout } = useAuthStore();

    const handleLogout = () => {
        startLogout();
    }

    return (
      <div className="navbar navbar-dark bg-dark mb-4 px-4">
          <span className="navbar-brand">
              <i className="fas fa-calendar-alt"></i>
              &nbsp;
              { user.name }
          </span>
  
          <button 
            className="btn btn-outline-danger"
            onClick={handleLogout} 
          >
              <i className="fas fa-sign-out-alt"></i>
              <span>Salir</span>
          </button>
      </div>
    )
  }