import React from 'react';
import { connect } from 'react-redux';

const style = {
    loadingImage:{
        width: 50,
        height: 50,
        zIndex: 10,
        position: 'fixed',
        left: 0,
        right: 0,
        top: '30%',
        margin: 'auto'
    },
    loadingWrapper:{
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: 9,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    loadingMessage:{
        position: 'absolute',
        top: '30%',
        paddingTop: 50,
        width: '100%',
        height: 20,
        textAlign: 'center',
        color: '#fff',
        fontSize: 20
    }
    
}

export class Loading extends React.Component {

    render(){
        if (this.props.isFetching)
            return (
                <div style={style.loadingWrapper}>
                    <img alt='loading' style={style.loadingImage}src="./loader.gif"/>
                    <div style={style.loadingMessage}>{this.props.loadingMessage}</div>
                </div>
            );

        return null;
    }
}

let mapStateToProps = (state) => {
    return {
    	isFetching: state.isFetching,
        loadingMessage: state.loadingMessage
    };
}

export default connect(mapStateToProps)(Loading);
