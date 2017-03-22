// let's go!
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss} from 'react-router';


import './css/style.css';
import App from './components/app';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';


//This is what we will use to route through the pages on our website, and which views the user will see.

//Matches cannot be direct children of BrowserRouter, so you need to warp them in a div.
const Root = () => {
  const repo = `/${window.location.pathname.split('/')[1]}`;
  return (
    <BrowserRouter basename={repo}>
      <div>
      <Match exactly pattern="/" component={StorePicker} />
      <Match pattern="/store/:storeId" component={App} />
      <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  )
}

render(<Root />, document.querySelector('#main'));
