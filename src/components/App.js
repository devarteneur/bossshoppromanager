import React, { Component } from 'react';
import './App.css';
import Nav from './Navigation/Nav';

import { BrowserRouter, Route } from 'react-router-dom';



import 'rsuite/lib/styles/index.less';
import 'rsuite/lib/styles/themes/dark/index.less';
//Components
import Placeholder from './Placeholder/Placeholder';
import ShopCreator from './ShopCreator/ShopCreator';

import { Button } from 'rsuite';

class App extends Component {
  render(){
    return (
      <BrowserRouter className="App">
        <Nav />
        <Route exact path="/" />
        <Route exact path="/shop-creator" component={ShopCreator}/>
        <Route exact path="/support-a-creator-shop" component={Placeholder}/>
        <Route exact path="/weekly-shop" component={Placeholder}/>
        
      </BrowserRouter>
    );
  }
}

export default App;
