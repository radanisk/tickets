import ticketsReducer, {  $$initialState as $$ticketsState } from './ticketsReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$ticketsStore: ticketsReducer,
  railsContext: railsContextReducer,
};

export const initialStates = {
  $$ticketsState,
  railsContextState,
};
