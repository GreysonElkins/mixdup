import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { UserProvider } from 'hooks'
import { App } from 'components';
import './index.scss';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

reportWebVitals();
