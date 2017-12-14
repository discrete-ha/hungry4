import React from 'react';
import { connect } from 'react-redux';
import Place from './Place';
import { bounceInLeft } from 'react-animations'
import Radium, {StyleRoot} from 'radium';

const style = {
	wrapper:{
		// background: "linear-gradient(217deg, rgba(51, 0, 0, 0.8), rgba(255, 0, 0, 0) 70.71%), linear-gradient(127deg, rgba(255, 82, 0, 0.73), rgba(255, 0, 0, 0) 70.71%), linear-gradient(336deg, rgba(99, 37, 48, 0.8), rgba(255, 0, 0, 0) 70.71%)",
		padding:10,
		flex: 1
	},
	place:{
		animation: 'x 1s',
		animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft')
	}
}

export class PlaceList extends React.Component {

    render(){
    	if (this.props.placeList.length > 0) {

			let placeListElement = this.props.placeList.map(function(place, index){
				let interval = index * 0.2 > 1 ? 1 : index * 0.2;
				return (<StyleRoot key={place.id}>
					<div style={{...style.place, animation: interval+'s'}}>
						<Place place={place} isRandom={false}/>
					</div>
				</StyleRoot>)
			});

			return (<div style={style.wrapper}>
				{placeListElement}
			</div>);
    	}else if(this.props.randomList.length > 0){
    		return (<StyleRoot style={style.wrapper}>
    			<div style={ {...style.place, padding:10 } }>
					<Place isRandom={true} />
				</div>
			</StyleRoot>);
    	}else{
    		return null;
    	}
    }
}

let mapStateToProps = (state) => {
    return {
    	placeList: state.placeList,
    	randomList: state.randomList
    };
}

export default connect(mapStateToProps)(PlaceList);
