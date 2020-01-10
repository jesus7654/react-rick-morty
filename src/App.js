import React from 'react';
import './App.css';

import {Switch, Route} from 'react-router-dom';

import {Home} from './pages/Home';
import {Detalle} from './pages/Detalle';




function App() {

   return (
    <div className="App">
      <Switch>
        <Route  exact path='/' component={Home} />
        <Route path='/detalle/:id/:tipo' component={Detalle} />
      </Switch>
    </div>
  )
}

export default App;
