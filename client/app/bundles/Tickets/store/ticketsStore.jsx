import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
    const initialTickets = props.tickets;
    const { $$ticketsState } = initialStates;
    const initialState = {
        $$ticketsStore: $$ticketsState.merge({
            $$tickets: initialTickets,
        }),
        railsContext,
    };

    // https://github.com/reactjs/react-router-redux
    const reducer = combineReducers({
        ...reducers,
        routing: routerReducer,
    });

    // Sync dispatched route actions to the history
    const finalCreateStore = compose(
        applyMiddleware(thunkMiddleware)
    )(createStore);

    return finalCreateStore(reducer, initialState);
};
