import React from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import ListingMapNew from '../components/ListingMapNew';


class ListingDetailMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            updateBounds: true,
            updateZoomLevel: true,
            center: null,
            zoomLevel: 18
        };
    }

    render(){
        var showDetail = false;
        return(
        <div className="m-4 shadow border">
            <Row className="mt-2 ml-0 mr-0">
                <Col>
                    <h3>Map</h3>
                </Col>
            </Row>
            <Row className="pt-2 ml-0 mr-0">
                <Col style={{margin: '10px', height: '300px'}}>
                    <ListingMapNew
                        showDetail={showDetail}
                        markers={this.props.markers}
                        bounds={this.props.bounds}
                        updateBounds={this.state.updateBounds}
                        updateZoomLevel={this.state.updateZoomLevel}
                        center={this.state.center}
                        zoomLevel={this.state.zoomLevel}
                        style={{width: '95%', height: "100%"}}
                        gestureHandling='cooperative'
                    />
                </Col>
            </Row>
        </div>
        )
    }
}

export default ListingDetailMap;
