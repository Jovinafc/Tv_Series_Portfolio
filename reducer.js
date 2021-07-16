export const initialState = {
  user: null,
  isAuthenticated: false,
};

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      localStorage.setItem('user', JSON.stringify(action.user));
      return {
        ...state,
        user: JSON.parse(localStorage.getItem('user')),
        isAuthenticated: true,
      };

    case actionTypes.LOGOUT:
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case actionTypes.LOAD_USER:
      return {
        ...state,
        user: JSON.parse(localStorage.getItem('user')),
      };
  }
};

export default reducer;
