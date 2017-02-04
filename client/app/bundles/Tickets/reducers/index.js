import ticketsReducer, {  $$initialState as $$ticketsState } from './ticketsReducer';
import sessionsReducer, { $$initialState as $$sessionsState } from './sessionsReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$ticketsStore: ticketsReducer,
  $$sessionsStore: sessionsReducer,
  railsContext: railsContextReducer,
};

export const initialStates = {
  $$ticketsState,
  $$sessionsState,
  railsContextState,
};
