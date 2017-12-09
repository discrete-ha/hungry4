import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";

const MyMap = withScriptjs(withGoogleMap(props =>{

  return <GoogleMap    
    defaultZoom={17}
    defaultCenter={props.center}
  >
    <Marker
      position={props.center}
    />
  </GoogleMap>
}
));

export default MyMap;
