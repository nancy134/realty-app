import React from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import ListingMap from '../components/ListingMap';

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
        <div className="mb-2 shadow border">
            <Row className="mt-2 ml-0 mr-0">
                <Col>
                    <h3>Map</h3>
                </Col>
            </Row>
            <Row className="pt-2 ml-0 mr-0">
                <Col style={{margin: '10px', height: '300px'}}>
                    <ListingMap
                        showDetail={showDetail}
                        markers={this.props.markers}
                        bounds={this.props.bounds}
                        updateBounds={this.state.updateBounds}
                        updateZoomLevel={this.state.updateZoomLevel}
                        center={this.state.center}
                        zoomLevel={this.state.zoomLevel}
                        style={{width: '95%'}}
                        gestureHandling='cooperative'
                    />
                </Col>
            </Row>
        </div>
        )
    }
}

export default ListingDetailMap;
