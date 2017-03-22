import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // constructor () {
  //   //Allows us to sprinkle on our extra stuff onto StorePicker
  //   super();
  //   //'this' is the StorePicker component
  //   this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(event) {
    event.preventDefault();
    //First grab the text from the box
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    //second we're going to transition from / to /store/store:id
    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return  (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        {/* Hello, this kind of commenting is only necessary when writing in jsx,
        Also, don't put comments at the top level of the return, it will flag an error.*/}
        <h2>Please Enter a Store</h2>
        <input type="text" required placeholder="Store Name"defaultValue = {getFunName()}
          ref={(input) => { this.storeInput = input }}/>
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

//This will tell React that the StorePicker component expects the router
StorePicker.contextTypes = {
  router: React.PropTypes.object
}
export default StorePicker;
