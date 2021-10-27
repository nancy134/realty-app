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
import ImageLibraryContainer from './ImageLibraryContainer';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

class ImageUploadLibrary extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    handleDeleteCard(id){
        console.log("handleDeleteCard: "+id);
        this.props.onImageDelete(id);
        /*
        var cards = this.state.cards;
        cards.splice(index,1);
        this.setState({
            cards: cards
        });
        this.props.onImagesChanged(cards);
        */
    }
    handleError(files){
        var errorMessage = "Image(s) are too large.  They must be less than 15MB.";
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
               <span style={{'fontSize': '80%'}}>To upload images, select Upload Images or drag and drop images to the dotted rectangle.<br/></span>
               <span style={{'fontSize': '80%'}}>Maximum image size: 15MB</span>
            </Alert>
            <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={this.props.uploading || this.props.successfullyUploaded}
                multiple={true}
                onError={this.handleError}
                label="Upload images"
            />

            <DndProvider backend={HTML5Backend}>
                <ImageLibraryContainer
                    cards={this.props.cards}
                    onListChanged={this.handleListChanged}
                    onMoveCard={this.handleMoveCard}
                    onDeleteCard={this.handleDeleteCard}
                />
            </DndProvider>

            { this.state.isError ?
            <Alert variant="danger">{this.state.errorMessage}</Alert>
            : null }
       </div>

    );
  }
}
export default ImageUploadLibrary;
