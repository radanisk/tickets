import ReactOnRails from 'react-on-rails';

import TicketsApp from './TicketsApp';
import ticketsStore from '../store/ticketsStore';

ReactOnRails.register({
  TicketsApp,
});

ReactOnRails.registerStore({
  ticketsStore,
});
