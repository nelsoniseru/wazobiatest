
export interface AuthState {
  user: any;
  error: string
}

export type AuthAction =
  | { type: 'SIGNUP'; payload: { data: object, error: string } }
  | { type: 'SIGNIN'; payload: { token: object } }
  | { type: 'LOGOUT' }
  | { type: 'ERROR'; payload: { error: string } }
  | { type: 'GET_USER'; payload: { user: object } }

export const initialAuthState: AuthState = {
  user: null,
  error: ''
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGNUP':
      return {
        ...state,
        user: action.payload.data,
        error: action.payload.error
      };
    case 'SIGNIN':
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        user: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,

      };
    case 'GET_USER':
      return {
        ...state,
        user: action.payload.user,

      };
    case 'ERROR':
      return {
        ...state,
        user: null,
        error: action.payload.error
      };
    default:
      return state;
  }
};