import React from 'react';
import { connect } from 'react-redux';
import FaSearch from 'react-icons/lib/fa/search';
import FaSearchClear from 'react-icons/lib/fa/times-circle';
import { setSearchText, setPlaceList } from '../actions/place';
import { setFetching } from '../actions/system';

const style = {
	section:{
		position: 'relative',
		fontSize: 18,
		padding: '0 8px 8px 8px',
		// backgroundColor: "rgb(200, 0, 0)",
		boxSizing: "border-box",
	},
	searchWrapper:{
		position: 'relative',
		maxWidth: 500,
		width: '100%',
		margin: 'auto'
	},
	input:{
		borderRadius: 10,
		paddingLeft: 40,
		paddingRight: 40,
		width: '100%',
		height: 30,
		border:'none',
		boxSizing: 'border-box',
		outline: 'none',
		fontSize: 15
	},
	icon:{
		position: 'absolute',
		top: 3,
		color: '#828282'
	}
}

export class SearchBar extends React.Component {

	constructor(props){
       super(props);
       this.timeout = 0;
    }

	handleSearchText(event){

		let searchText = event.target.value.trim();
		if(this.timeout) 
			clearTimeout(this.timeout);

	    this.timeout = setTimeout( () => {

			if ( this.props.searchText !== searchText && searchText.length > 0 ){
				this.props.setSearchText(searchText);
			}else if(searchText.length === 0){
				this.props.setPlaceList([]);
			}

	    }, 500);

	}

	clearText(){
		this.refs.searchInput.value = '';
		this.props.setSearchText('');
		this.props.setPlaceList([]);
	}

	render(){
		return (<section style={style.section}>
					<div style={style.searchWrapper}>
						<label style={{...style.icon,left:15}}>
							<FaSearch />
						</label>
						<input placeholder="Search" style={style.input} ref="searchInput" onChange={this.handleSearchText.bind(this)}/>
						<a onClick={this.clearText.bind(this)} style={{...style.icon, right:15, cursor: 'pointer'}}><FaSearchClear /></a>
					</div>
				</section>);
	}
}

let mapStateToProps = (state) => {
	return {
		searchText: state.searchText,
		foursquare: state.foursquare
	};
}

let mapDispatchToProps = (dispatch) => {
	return {
		setSearchText: (text) => dispatch(setSearchText(text)),
		setFetching: (flag) => dispatch(setFetching(flag)),
		setPlaceList: (data) => dispatch(setPlaceList(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
