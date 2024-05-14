import { ACTIONS } from "../constants";
export const initialState = {
  token: "",
  name: "",
  products: [],
  isAuth: false,
};

export function appReducer(state, action) {
  const { token, type, products } = action;
  switch (type) {
    case ACTIONS.login:
      return {
        ...state,
        token: token,
        isAuth: true,
      };
    case ACTIONS.logut: {
      return {
        ...initialState,
      };
    }
    case ACTIONS.products: {
      return {
        ...state,
        products: products,
      };
    }
    case ACTIONS.addProduct: {
    }
  }
}
