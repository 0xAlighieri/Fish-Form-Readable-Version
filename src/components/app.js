import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import base from '../base';


import sampleFishes from '../sample-fishes.js';

class App extends React.Component {
  //Create initial state of app
  constructor() {
    super();
    //Add our addFish method to our app component
    this.addFish = this.addFish.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);



    //GetinitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  //This is a React-specific life-cycle call that will be used to sync our app with Firebase.
  componentWillMount() {
    //This runs right before the app is rendered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    //check if there is an order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef) {
      //update our app component's order state
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }


  //This will stop the app from loading on unnecessary event listerns which could cause terrible performance issues
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    //Save the order to local storage; use JSON to stringify the object, because local storage
    //will only take string data
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify( nextState.order));
  }

  addFish(fish) {
    //update our state
    // the '...' is a  spread which will take every item from our fishes object and spread it into our object
    const fishes = {...this.state.fishes};
    //add new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;

    //set state
    //first fishes is the originally object, second fishes is our new fishes object we want to update to
    //Since they're the same name, in ES6, we could just pass 'fishes' once
    this.setState({ fishes: fishes });
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
  }

  loadSamples () {
    this.setState( {
      fishes: sampleFishes
    });
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};

    //update or add the new number of fish ordered
    //If the fish is already on the order, add one to it. If not. then setthe new fish to '1' initially.
    order[key] = order[key] + 1 || 1;

    //update our state
    this.setState({ order });
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }



  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seaford Market"/>
          <ul className="list-of-fishes">
            {
              Object
              .keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>

        </div>
        <Order fishes={this.state.fishes}
               order={this.state.order}
               params={this.props.params}
               removeFromOrder = {this.removeFromOrder}/>
        <Inventory addFish={this.addFish}
                   loadSamples={this.loadSamples}
                   fishes={this.state.fishes}
                   updateFish = {this.updateFish}
                   removeFish= {this.removeFish}
                   storeId = {this.props.params.storeId}
                   />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
