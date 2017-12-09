import React from 'react';
import { setImageGallery } from '../actions/place';
import { connect } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const style = {
    thumnaiWrapper:{
        marginTop: 10,
        textAlign: 'center'
    },
    thumbs:{
        width:88,
        height:88,
        marginLeft: 10,
        cursor: 'pointer'
    },
    galleryScreen:{
        height: '100%',
        width: '100%',
        position: 'fixed',
        zIndex: 9,
        top:0,
        left:0,
        background: 'rgba(0,0,0,0.8)'
    },
    galleryWrapper:{
        width: '100%',
        maxWidth: 500,
        left: 0,
        right: 0,
        top: 0,
        paddingTop: '10%',
        margin: 'auto',
        position: 'fixed',
        zIndex: 10
    }
}

export class Photos extends React.Component {

    showImageGallery(index){
        this.props.setImageGallery(index);
    }

    renderImageGallery(){
        let showImageIndex = this.props.showImageIndex;
        if (showImageIndex !== null) {
            return (
                <div>
                    <div style={style.galleryScreen} onClick={this.showImageGallery.bind(this, null)}></div>
                    <div style={style.galleryWrapper}>
                        <ImageGallery startIndex={showImageIndex} items={this.props.photos}/>
                    </div>
                </div>);    
        }else{
            return null;
        }
    }

    renderPhoto(){
        return this.props.photos.map((photo, index)=>{
            return <img key={index} alt='place photos' src={photo.thumbnail} style={style.thumbs} 
            onClick={this.showImageGallery.bind(this, index)} />
        });
    }

    render(){
        if (this.props.photos) {
            return (
                <div style={style.thumnaiWrapper}>
                    {this.renderImageGallery()}
                    {this.renderPhoto()}
                </div>
            );    
        }
        return null;
    }
}


let mapStateToProps = (state) => {
    return {
        showImageIndex: state.showImageIndex
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        setImageGallery: (index) => dispatch(setImageGallery(index))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos);

