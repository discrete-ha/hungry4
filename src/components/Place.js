import React from 'react';
import { connect } from 'react-redux';
import { setDetailPlace, setShowingPlace, setRandomPlace } from '../actions/place';
import { setFetching } from '../actions/system';
import MyMap from './MyMap';
import Foursquare from '../services/Foursquare';
import Photos from './Photos';
import { rubberBand , fadeIn} from 'react-animations'
import Radium, {StyleRoot} from 'radium';
import ArrowCircleRight from 'react-icons/lib/fa/arrow-circle-right';

let RANDOM_ITEM_ID = 'randomitem';

const style = {
	placeWrapper:{
		margin: 'auto',
		maxWidth: 600,
		width: '100%',
		border: 'none',
	    borderRadius: 10,
	    backgroundColor: 'rgba(255, 255, 255, 0.2)',
	    padding: 3,
	    marginBottom: 10
	},
	title:{
		padding: 3,
		fontSize: 20,
		fontWeight: 500,
		color: '#fff'
	},
	childText:{
		padding: 3,
		fontSize: 14,
		fontWeight: 500,
		color: 'rgba(255, 255, 255, 1)'
	},
	link:{
		textDecoration: 'underline',
    	color: '#c5e2ff'
	},
	mapWrapper:{
		maxWidth:600,
		boxSizing: "border-box",
		width:'100%',
		height:320,
		padding:10,
		margin: 'auto'
	},
	pin:{
		color: 'rgb(200, 50, 50)',
		fontSize: 20
	},
    img:{
        width: 60,
        height: 60,
        position: 'absolute',
	    left: 0,
	    right: 0,
	    top: 0,
	    bottom: 0,
	    margin: 'auto',
	    animation: 'x 2s',
		animationName: Radium.keyframes(rubberBand, 'rubberBand'),
		animationIterationCount:'infinite'
    },
    randomWrapper:{
    	cursor: 'pointer', 
    	height: 100, 
    	position:'relative'
    },
    placeDetail:{
    	animation: 'x 1s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
    nextWapper:{
    	position: 'relative'
    },
    nextIcon:{
    	position: 'absolute',
    	top:10,
    	right:10,
    	color: '#fff',
    	fontSize: 30,
    	cursor: 'pointer'
    }
}

export class Place extends React.Component {

    constructor(props){
       super(props);
       this.showRandomPlace = this.showRandomPlace.bind(this);
       this.showDetail = this.showDetail.bind(this);
    }

	showRandomPlace(){
		let places = this.props.randomList;
		let randIndex = Math.floor( (Math.random() * (places.length - 1) ) );
		let randomPlace = places[randIndex];
		this.props.setRandomPlace(randomPlace);
		this.props.setShowingPlace(RANDOM_ITEM_ID);
		if (!this.props.placeDetail[randomPlace.id]) {
			this.getPlaceDetail(randomPlace.id);
		}
	}

	getPlaceDetail(placeId){
		this.props.setFetching(true);
	    Foursquare.getPlaceDetail(placeId, (venue)=>{
			this.props.setDetailPlace(venue);
	        this.props.setFetching(false);
		});
	}

	showDetail(placeId){
		if (placeId === this.props.showingPlace) {
			this.props.setShowingPlace(null);
		}else{
			this.props.setShowingPlace(placeId);
			if (!this.props.placeDetail[placeId]) {
				this.getPlaceDetail(placeId);
			}
		}
	}

	showNextRandom(){
		return (<div style={style.nextWapper}>
				<ArrowCircleRight style={style.nextIcon}  onClick={this.showRandomPlace}/>
			</div>);
	}

    render(){
        let link = null;
        let place = this.props.isRandom ? this.props.randomPlace : this.props.place;

        if (this.props.isRandom && this.props.showingPlace !==  RANDOM_ITEM_ID) {
        	return <div style={{...style.placeWrapper, ...style.randomWrapper}} onClick={this.showRandomPlace}>
        			<StyleRoot>
						<img style={style.img} src="./random.png" />
					</StyleRoot>
				</div>;
        }else{
        	let placeDetail = this.props.placeDetail;
			let placeDetailElement = null; 
			if (place.url) {
				link = <div style={style.childText}><a href={place.url} target="blank" style={style.link} >{place.url}</a></div>;
			}

			if ( placeDetail[place.id] && ( this.props.showingPlace === place.id || this.props.showingPlace ===  RANDOM_ITEM_ID ) ) {
				placeDetailElement = (
					<StyleRoot>
						<div style={style.placeDetail}>
							<Photos photos={placeDetail[place.id].photos} />
							<div style={style.mapWrapper}>
								<MyMap
									center={{lat:placeDetail[place.id].location.lat, lng:placeDetail[place.id].location.lng}}
									googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCgFwkfQzeKxUQNlMuooiFWt6nLJovy7bw&v=3.exp&libraries=places"
									loadingElement={<div style={{ height: `300px` }} />}
								    containerElement={<div style={{ height: `300px` }} />}
								    mapElement={<div style={{ height: `300px` }} />}
							    />
						    </div>
						</div>
					</StyleRoot>
				);
			}

		    return (<div style={style.placeWrapper}>
		    		{this.showNextRandom()}
			    	<div style={{cursor: 'pointer'}} onClick={()=>this.showDetail(place.id)}>
				    	<div style={style.title}>{place.name}</div>
				    	<div style={style.childText}>{place.location.formattedAddress[0]} {place.location.formattedAddress[1]}</div>
				    	<div style={style.childText}>{place.location.distance}m</div>
			    	</div>
			    	{link}
			    	<div style={style.childText}>{place.contact.formattedPhone}</div>
			    	{placeDetailElement}
			    </div>);
        }
    }
}

let mapStateToProps = (state) => {
    return {
    	foursquare :state.foursquare,
    	placeDetail: state.placeDetail,
    	showingPlace: state.showingPlace,
    	randomList: state.randomList,
    	randomPlace: state.randomPlace
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
    	setFetching: (flag) => dispatch(setFetching(flag)),
    	setDetailPlace: (detail) => dispatch(setDetailPlace(detail)),
    	setShowingPlace: (placeId) => dispatch(setShowingPlace(placeId)),
    	setRandomPlace: (data) => dispatch(setRandomPlace(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Place);
