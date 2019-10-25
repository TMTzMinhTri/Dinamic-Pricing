
import React from "react";
import AppContainer from './navigation'
import { Provider } from 'react-redux';

import { store } from "./Store";
export default class App extends React.Component {
  render() {
    return <Provider store={store}>
      <AppContainer />
    </Provider>;
  }
}
