import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import '../styles/LoginPage.css';
import { useEffect } from 'react';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
} 

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const LoginPage = () => {

  const { startLogin, startRegister, errorMessage } = useAuthStore();

  const { loginEmail,loginPassword, onInputChange: onLoginChange  } = useForm(loginFormFields);
  const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterChange  } = useForm(registerFormFields);

  const loginSubmit = (e) => {
    e.preventDefault();
    startLogin({email: loginEmail, password: loginPassword});
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    console.log({
      registerName,
      registerEmail,
      registerPassword,
      registerPassword2
    });

    if(registerPassword !== registerPassword2) {
      return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
    }

    startRegister({
      email: registerEmail,
      password: registerPassword,
      name: registerName
    });
  }

  useEffect(() => {
    
    console.log(`errorMessage changed: ${errorMessage}`);errorMessage
    

    if(errorMessage !== undefined) {
      Swal.fire('Error', errorMessage, 'error');
    }
  
  }, [errorMessage])
  

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='loginPassword'
                value={loginPassword}
                onChange={onLoginChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"

              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name='registerName'
                value={registerName}
                onChange={onRegisterChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name='registerEmail'
                value={registerEmail}
                onChange={onRegisterChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name='registerPassword2'
                value={registerPassword2}
                onChange={onRegisterChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}