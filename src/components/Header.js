import React from 'react';

//This is a stateless function
const Header = (props) => {
    console.log(this);
    return (
      <header className="top">
        <h1>Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day</h1>
        {/* 'this' refers to the component, props refers to an object on the components
          and tagline would be the attribrute in the object. THIS REFERS to COMPONENTS< NOT STATELESS FUNCTIONS*/}
        <h3 className="tagline"><span>{props.tagline}</span></h3>
      </header>
    )
}

Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}


export default Header;
