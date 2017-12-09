import React from 'react';
import SearchBar from './SearchBar';

const style = {
    header:{
        // backgroundColor: "rgb(200, 0, 0)",
        padding: 10,
        color: "#fff",
        textAlign: "center"
    },
    appTitle:{
        fontSize: 25,
        fontWeight: 900
    },
    text:{
        fontSize:14
    },
    link:{
        textDecoration: 'none',
        color: '#fff'
    }
}

class Header extends React.Component {

    render(){
        return (<div style={style.header}>
          <div style={style.text}>what are you </div>
          <div style={style.appTitle}><a style={style.link} href="/">HUNGRY4</a></div>
        </div>)
    }
}

export default Header;
