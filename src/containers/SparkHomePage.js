import React from 'react';
import './SparkHomePage.css';
import SparkCollections from '../components/SparkCollections';
import SparkCollectionListings from '../components/SparkCollectionListings';
import SparkCollectionPreview from '../components/SparkCollectionPreview';
import SparkAddCollection from '../components/SparkAddCollection';

export class SparkHomePage extends React.Component {
    render(){
        return(
            <React.Fragment>
                <SparkAddCollection
                    show={this.props.showSparkAddCollection}
                />
                <div className="main-container">
                    <div className="left">
                        <SparkCollections
                            accessToken={this.props.accessToken}
                            sparkCollections={this.props.sparkCollections}
                            onSparkCollectionSelect={this.props.onSparkCollectionSelect}
                            sparkSelectedCollection={this.props.sparkSelectedCollection}
                        /> 
                    </div>
                    <div className="middle">
                        <SparkCollectionListings
                            accessToken={this.props.accessToken}
                            sparkCollectionListings={this.props.sparkCollectionListings}
                        />
                    </div>
                    <div className="right">
                        <SparkCollectionPreview />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SparkHomePage; 
