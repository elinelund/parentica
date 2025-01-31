import React, { Component } from 'react';
import './styles/App.scss';
import Main from './pages/Main';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScrollToTop from './components/ScrollToTop';
import LocaleContextProvider from './contexts/LocaleContext';

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <BrowserRouter>
            <CssBaseline />
            <ScrollToTop>
              <div className="App">
                <LocaleContextProvider>
                <Switch>
                  <Route path="/en" component={Main} />
                  <Route path="/es" component={Main} />
                  <Redirect to="/en" />
                </Switch>
                </LocaleContextProvider>
              </div>
            </ScrollToTop>
          </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
