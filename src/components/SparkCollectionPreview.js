import React from 'react';
import {
    Navbar,
    Nav
}
from 'react-bootstrap';


class SparkCollectionPreview extends React.Component{
    render(){
        return(
        <React.Fragment>
            <div className="main-container">
            <div className="child scrollable">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Preview</Navbar.Brand>
            </Navbar>
            <iframe title="preview" frameBorder="0" src="https://mu-s3-mail-templates.s3.amazonaws.com/RealEstateTemplate.html"className="frame-container" />
        </div>
        </div>
        </React.Fragment>
        );
    }
}

export default SparkCollectionPreview;
