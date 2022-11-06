import { Fragment } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import './App.css';

const App = () => (
  <Fragment>
    <h1>App</h1>
    <Navbar></Navbar>
    <Landing></Landing>
  </Fragment>
);

export default App;
