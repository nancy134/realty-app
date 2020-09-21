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
        <React.Fragment>
            <Row className="mt-3 border-bottom border-warning">
                <Col>
                    <h3>Map</h3>
                </Col>
            </Row>
            <Row>
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
                    />
                </Col>
            </Row>
        </React.Fragment>
        )
    }
}

export default ListingDetailMap;
