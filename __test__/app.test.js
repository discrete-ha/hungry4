import React from 'react';
import renderer from 'react-test-renderer';
import testData from './test.data.json';
import Header from '../src/components/Header';
import { Loading } from '../src/components/Loading';
import MyMap from '../src/components/MyMap';
import { Place } from '../src/components/Place';
import { SearchBar } from '../src/components/SearchBar';

let defaultProps = {
	isFetching: true,
    searchText: '',
    foursquare:{
    	"ll": "35.648795,139.702237",
  		"radius": 1000
    },
    placeList:[],
    randomList:[],
    placeDetail:{},
    randomPlace:null,
    showingPlace:null
}

describe('app components render', () => {
  	test('Header', ()=>{
		const component = renderer.create(
			<Header />,
		);
		let headerSnapshot = component.toJSON();
		expect(headerSnapshot).toMatchSnapshot();
	});

  	test('Loading - fetching', ()=>{
		const component = renderer.create(
			<Loading isFetching={true}/>,
		);
		let loadingSnapshot = component.toJSON();
		expect(loadingSnapshot).toMatchSnapshot();
	});

	test('Loading - not fetching', ()=>{
		const component = renderer.create(
			<Loading />,
		);
		let loadingSnapshot = component.toJSON();
		expect(loadingSnapshot).toMatchSnapshot();
	});

	test('MyMap', ()=>{
		const component = renderer.create(
			<MyMap
				center={{lat:35.648795, lng:139.702237}}
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCgFwkfQzeKxUQNlMuooiFWt6nLJovy7bw&v=3.exp&libraries=places"
				loadingElement={<div style={{ height: `300px` }} />}
			    containerElement={<div style={{ height: `300px` }} />}
			    mapElement={<div style={{ height: `300px` }} />}
		    />
		);
		let myMapSnapshot = component.toJSON();
		expect(myMapSnapshot).toMatchSnapshot();
	});

	test('Place - Random', ()=>{
		const component = renderer.create(
			<Place isRandom={true} />,
		);
		let placeSnapshot = component.toJSON();
		expect(placeSnapshot).toMatchSnapshot();
	});

	test('Place - Not random', ()=>{
		const component = renderer.create(
			<Place isRandom={false} 
				place={testData.place}
				{...defaultProps} />,
		);
		let placeSnapshot = component.toJSON();
		expect(placeSnapshot).toMatchSnapshot();
	});

	test('SearchBar', ()=>{
		const component = renderer.create(
			<SearchBar />,
		);
		let searchBarSnapshot = component.toJSON();
		expect(searchBarSnapshot).toMatchSnapshot();
	});

});


