import { store } from './store';
import { TIgredientsAndOrdersActions } from './actions/ingredients';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TOpenModalActions } from './actions/modal';
import { TUserActions } from './actions/user';

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions = 
  | TIgredientsAndOrdersActions
  | TOpenModalActions
  | TUserActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = typeof store.dispatch; 