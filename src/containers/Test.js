import React, { Component } from 'react';
import './Home.css';
import {
} from 'react-bootstrap';
import { GoogleApiWrapper } from 'google-maps-react';

export class Test extends Component { 

  render(){
  return (
<div>
  <div >
<iframe src="https://local.phowma.com/listing?embed=true&user=b6e7245e-38a7-4009-bef5-df891ee5f9af" title="FindingCRE Listings" width="90%" height="600px" ></iframe>


  </div>
</div>
  );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB47KccZa8VRlzFuQJAvZ8UPembfW-3gq4'
})(Test);
