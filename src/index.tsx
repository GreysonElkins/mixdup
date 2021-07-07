import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { CalendarProvider, UserProvider, LeagueProvider, ModalProvider } from 'hooks'
import { App } from 'components';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
        <CalendarProvider>
          <LeagueProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </LeagueProvider>
        </CalendarProvider>
    </UserProvider>
    <ToastContainer position="top-right" />
  </BrowserRouter>,
  document.getElementById('root')
)

serviceWorkerRegistration.register();

reportWebVitals();
