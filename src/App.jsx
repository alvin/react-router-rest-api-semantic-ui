import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import Routes from './Routes';
import '../semantic/dist/semantic.css';

//import reactLogo from './assets/React-icon.png';

const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
