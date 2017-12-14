import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
import Header from './Header';
import PlaceList from './PlaceList';
import SearchBar from './SearchBar';
import Foursquare from '../services/Foursquare';
import { setPlaceList, setRandomList, setCoordinate } from '../actions/place';
import { setFetching, setLoadingMessage } from '../actions/system';
import { detect } from 'detect-browser';

const browser = detect();
const style = {
  appWrapper:{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  notSupport:{
    color: '#fff',
    position: 'fixed',
    margin: 'auto',
    width: '100%',
    top: '30%',
    height: 20,
    textAlign: 'center'
  }
}

class App extends Component {

  constructor(props){
    super(props);
  }

  searchPlace(searchText){
    if (searchText.length === 0) 
      return false;

    this.props.setFetching(true);
    Foursquare.searchPlace(this.props.coordinate, searchText, (places)=>{
      this.props.setPlaceList(places);
      this.props.setFetching(false);
    });
  }

  getRandomPlace(){
    Foursquare.getRandomPlace(this.props.coordinate, (places)=>{
      this.props.setRandomList(places);
      this.props.setFetching(false);
    });
  }

  componentWillMount(){
    if (browser.name === 'chrome') {
      this.props.setLoadingMessage('Getting geolocation...');
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          this.props.setCoordinate(position.coords.latitude+','+position.coords.longitude);
          this.props.setLoadingMessage('Fetching data...');
          this.getRandomPlace();
        }.bind(this),
        function(error) {
          console.log('Error occurred. Error code: ' + error.code);
        });
      } 
      else {
        alert('Geolocation is not supported for this Browser/OS.');
      }
    }
  }

  shouldComponentUpdate(nextProps){
    if (this.props.searchText !== nextProps.searchText) {
      this.searchPlace(nextProps.searchText);
    }
    return true;
  }

  render() {
    if (browser.name !== 'chrome') {
      return (<div style={style.appWrapper}>
          <Header />
          <div style={style.notSupport}>
            <div>This app is not supported for this Browser/OS.</div>
            Available on <a href="https://www.google.com/chrome/index.html" target="blank">Chrome</a>
          </div>
        </div>);
    }else{
      return (
        <div style={style.appWrapper}>
          <Loading />
          <Header />
          <SearchBar />
          <PlaceList />
        </div>
      );
    }
    
  }
}

let mapStateToProps = (state) => {
    return {
      isFetching: state.isFetching,
      foursquare: state.foursquare,
      searchText: state.searchText,
      coordinate: state.coordinate,
      loadingMessage: state.loadingMessage
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        setCoordinate: (ll) => dispatch(setCoordinate(ll)),
        setFetching: (flag) => dispatch(setFetching(flag)),
        setPlaceList: (data) => dispatch(setPlaceList(data)),
        setRandomList: (data) => dispatch(setRandomList(data)),
        setLoadingMessage: (text) => dispatch(setLoadingMessage(text))
    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
