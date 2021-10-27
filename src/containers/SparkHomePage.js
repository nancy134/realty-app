import React from 'react';
import './SparkHomePage.css';
import SparkCollections from '../components/SparkCollections';
import SparkCollectionListings from '../components/SparkCollectionListings';
import SparkCollectionPreview from '../components/SparkCollectionPreview';
import SparkAddCollection from '../components/SparkAddCollection';
import SparkSavedSearches from '../components/SparkSavedSearches';
import SparkListings from '../components/SparkListings';

export class SparkHomePage extends React.Component {
    render(){
        return(
            <React.Fragment>
                <SparkAddCollection
                    show={this.props.showSparkAddCollection}
                />
                <div className="main-container">
                    <div className="left">
                        
                        {/*
                        <SparkCollections
                            accessToken={this.props.accessToken}
                            sparkCollections={this.props.sparkCollections}
                            onSparkCollectionSelect={this.props.onSparkCollectionSelect}
                            sparkSelectedCollection={this.props.sparkSelectedCollection}
                        />
                        */} 
                        <SparkSavedSearches
                            accessToken={this.props.accessToken}
                            sparkSavedSearches={this.props.sparkSavedSearches}
                            onSparkSavedSearchSelect={this.props.onSparkSavedSearchSelect}
                            sparkSelectedSavedSearch={this.props.sparkSelectedSavedSearch}
                        />
                    </div>
                    <div className="middle">

                        <SparkListings
                            accessToken={this.props.accessToken}
                            sparkListings={this.props.sparkListings}
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
