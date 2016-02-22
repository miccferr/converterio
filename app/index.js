import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.css';

// required for material ui
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { App } from './containers/App';

render(

<App />,

  // <Provider store={store}>
  //   <Router history={hashHistory}>
  //     {routes}
  //   </Router>
  // </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
