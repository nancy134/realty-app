import React, { Component } from 'react'
import Dropzone from './Dropzone'
import Progress from './Progress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import {
    Alert
} from 'react-bootstrap';
import ImageContainer from './ImageContainer';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

class ImageUpload extends Component {
    constructor(props) {
        super(props);

        var cards = [];
        if (this.props.listing && this.props.listing.images.length > 0){
            for (var i=0; i<this.props.listing.images.length; i++){
                var image = this.props.listing.images[i];
                var card = {
                    id: image.id,
                    url: image.url,
                    order: image.order,
                    file: null
                }
                cards.push(card);
            }
        }
        this.state = {
            cards: cards,
            isError: false,
            errorMessage: ""
        };

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.renderProgress = this.renderProgress.bind(this);
        this.handleMoveCard = this.handleMoveCard.bind(this);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
        this.handleError = this.handleError.bind(this);

    }
    onFilesAdded(files) {
        this.props.onFilesAdded(files);
        var cards = this.state.cards;
        if (files){
            for (var j=0; j<files.length; j++){
                var file = files[j];
                var card = {
                    id: Math.floor(Math.random() * 1001)+1,
                    url: null,
                    file: file
                };
                cards.push(card);
            }
        }
        for (var i=0; i<cards.length; i++){
            cards[i].order = i+1;
        }
        this.setState({
            cards: cards,
            isError: false,
            errorMessage: ""
        });
        this.props.onImagesChanged(cards);

    }
    handleMoveCard(dragIndex, hoverIndex){
        var cards = this.state.cards;
        var dragCard = cards[dragIndex];
        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard]
                ]
            }
        }), () => {
            this.props.onImagesChanged(this.state.cards);
        });
    }
    handleDeleteCard(index){
        var cards = this.state.cards;
        cards.splice(index,1);
        this.setState({
            cards: cards
        });
        this.props.onImagesChanged(cards);
    }
    handleError(files){
        var errorMessage = "Image(s) are too large.  They must be less than 3MB.";
        this.setState({
            errorMessage: errorMessage,
            isError: true
        });
    }
    renderProgress(file) {
        const uploadProgress = this.props.uploadProgress[file.name];
        if (this.props.uploading || this.props.successfullyUploaded) {

            return (
                <div className="ProgressWrapper">
                    <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
                    <FontAwesomeIcon 
                        style={{
                            opacity:
                            uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                        }}
                        icon={faCheck} 
                    />
                    {uploadProgress ?
                    <p>{file.name} {uploadProgress.percentage}</p>
                    : null}
                </div>
            );
        }
    }

    moveCard(dragIndex, hoverIndex){

    }
    render(){
        return (
        <div>
            <Alert
                variant="info"
            >
               <span style={{'font-size': '80%'}}>To upload images, select Upload Images or drag and drop images to the dotted rectangle.<br/></span>
               <span style={{'font-size': '80%'}}>To reorder images, drag image to desired location. Maximum image size: 3MB</span>
            </Alert>
            <DndProvider backend={HTML5Backend}>
                <ImageContainer
                    listing={this.props.listing}
                    cards={this.state.cards}
                    onListChanged={this.handleListChanged}
                    onMoveCard={this.handleMoveCard}
                    onDeleteCard={this.handleDeleteCard}
                />
            </DndProvider>
            <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={this.props.uploading || this.props.successfullyUploaded}
                multiple={true}
                onError={this.handleError}
                label="Upload images"
            />
            { this.state.isError ?
            <Alert variant="danger">{this.state.errorMessage}</Alert>
            : null }
       </div>

    );
  }
}
export default ImageUpload;
