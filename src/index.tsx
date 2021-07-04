import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import App from './components/App/App';
import './index.scss';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

reportWebVitals();
