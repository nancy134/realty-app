import React, { Component } from 'react'
import './ImageUpload.css'
import Dropzone from './Dropzone'
import Progress from './Progress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import {
//    Image
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
                    file: null
                }
                cards.push(card);
            }
        }

        this.state = {
            cards: cards,
        };

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.renderProgress = this.renderProgress.bind(this);
        this.handleMoveCard = this.handleMoveCard.bind(this);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);

    }
    onFilesAdded(files) {
        this.props.onFilesAdded(files);
        var cards = this.state.cards;
        if (files){
            for (var j=0; j<files.length; j++){
                var file = files[j];
                var card = {
                    id: Math.floor(Math.random() * 101)+1,
                    url: null,
                    file: file
                };
                cards.push(card);
            }
        }
        this.setState({
            cards: cards
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
        }));
        this.props.onImagesChanged(cards);

    }
    handleDeleteCard(index){
        var cards = this.state.cards;
        cards.splice(index,1);
        this.setState({
            cards: cards
        });
        this.props.onImagesChanged(cards);
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

                    />
       </div>

    );
  }
}
export default ImageUpload;
