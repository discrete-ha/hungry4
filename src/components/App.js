import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFetching } from '../actions/system';
import Loading from './Loading';
import Header from './Header';
import PlaceList from './PlaceList';
import SearchBar from './SearchBar';
import Foursquare from '../services/Foursquare';
import { setPlaceList, setRandomList } from '../actions/place';

const style = {
  appWrapper:{
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}

class App extends Component {

  searchPlace(searchText){
    if (searchText.length === 0) 
      return false;

    this.props.setFetching(true);
    Foursquare.searchPlace(searchText, (places)=>{
      this.props.setPlaceList(places);
      this.props.setFetching(false);
    });
  }

  getRandomPlace(){
    Foursquare.getRandomPlace((places)=>{
      this.props.setRandomList(places);
      this.props.setFetching(false);
    });
  }

  componentWillMount(){
    this.getRandomPlace();
  }

  shouldComponentUpdate(nextProps){

    if (this.props.searchText !== nextProps.searchText) {
      this.searchPlace(nextProps.searchText);
    }
    return true;
  }

  render() {
    console.log('app render');
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

let mapStateToProps = (state) => {
    return {
      isFetching: state.isFetching,
      foursquare: state.foursquare,
      searchText: state.searchText
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        setFetching: (flag) => dispatch(setFetching(flag)),
        setPlaceList: (data) => dispatch(setPlaceList(data)),
        setRandomList: (data) => dispatch(setRandomList(data))
    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
