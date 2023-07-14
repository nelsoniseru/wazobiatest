import React, { createContext, useReducer } from 'react';
import { authReducer, AuthState, AuthAction, initialAuthState } from '../Reducers/AuthReducer';
import { useNavigate } from 'react-router-dom';
interface AuthContextProps {
  state: AuthState;
  signup: (firstname: string, lastname: string, email: string, password: string) => void;
  signin: (email: string, password: string) => void;
  logout: () => void;
  getUser: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  state: initialAuthState,
  signup: () => { },
  signin: () => { },
  logout: () => { },
  getUser: () => { },
});


type AuthContextProviderType = {
  children: React.ReactNode
}
export const AuthProvider = ({ children }: AuthContextProviderType) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

  const signup = async (firstname: string, lastname: string, email: string, password: string) => {
    try {
      const data = {
        firstname,
        lastname,
        email,
        password
      }
      //console.log(data)
      const users = JSON.parse(localStorage.getItem("User") || '[]');
      if (users !== null) {
        let existinguser = users.find((e: any) => e.email == email)
        if (existinguser !== undefined) {
          dispatch({ type: 'ERROR', payload: { error: "Email already in use" } });

        } else {
          const users = JSON.parse(localStorage.getItem("User") || '[]');
          if (users) {
            users.push(data)
            localStorage.setItem("User", JSON.stringify(users))
            dispatch({ type: 'SIGNUP', payload: { data, error: '' } });
            navigate('/login');

          } else {
            localStorage.setItem("User", JSON.stringify(data))
            dispatch({ type: 'SIGNUP', payload: { data, error: '' } });
            navigate('/login');

          }

        }
      }

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const db = JSON.parse(localStorage.getItem("User") || '[]');
      let user = db.find((e: any) => e.email == email)
      if (user && password == user.password) {
        dispatch({ type: 'SIGNIN', payload: { token: user } });
        navigate('/dashboard');
      } else {
        dispatch({ type: 'ERROR', payload: { error: 'Invalid credentials' } });

      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const getUser = () => {
    let email = localStorage.getItem("User")
    const db = JSON.parse(localStorage.getItem("User") || '[]');
    let user = db.find((e: any) => e.email == email)
    dispatch({ type: 'GET_USER', payload: { user: user } });

  }
  return (
    <AuthContext.Provider value={{ state, signup, signin, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
}; 