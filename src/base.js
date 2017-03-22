import Rebase from 're-base';


//Create a 'base', or a connection to our firebase database
const base = Rebase.createClass({
  apiKey: "AIzaSyCUH33siByOIrEaWEWq73WPVlOnnM2I91c",
  authDomain: "catch-of-the-day-taylor-french.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-taylor-french.firebaseio.com",
});

export default base;
