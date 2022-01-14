import { IModal } from "../../utils/interfaces";
import {
  IS_OPEN_ORDER,
  IS_OPEN_INGREDIENT,
  IS_OPEN_ORDER_DETAILS,
  TOpenModalActions,
} from "../actions/modal";

const initialState: IModal = {
  isOpenModalOrder: false,
  isOpenModalIngredient: false,
  isOpenModalOrderDetails: false,
};

export const modalReducer = (
  state = initialState,
  action: TOpenModalActions
) => {
  switch (action.type) {
    case IS_OPEN_ORDER: {
      return {
        ...state,
        isOpenModalOrder: action.isOpen,
      };
    }
    case IS_OPEN_INGREDIENT: {
      return {
        ...state,
        isOpenModalIngredient: action.isOpen,
      };
    }
    case IS_OPEN_ORDER_DETAILS: {
      return {
        ...state,
        isOpenModalOrderDetails: action.isOpen,
      };
    }
    default: {
      return state;
    }
  }
};
