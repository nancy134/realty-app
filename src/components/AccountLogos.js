import React from 'react';
import {
Container
} from 'react-bootstrap'; 
import ImageUploadLibrary from './ImageUploadLibrary';
import libraryService from '../services/library';

class AccountLogos extends React.Component {
    constructor(props){
        super(props);

        this.handleFilesAdded = this.handleFilesAdded.bind(this);
        this.handleImagesChanged = this.handleImagesChanged.bind(this);
        this.handleImageDelete = this.handleImageDelete.bind(this);
        this.checkForAddedImages = this.checkForAddedImages.bind(this);
        this.progressCB = this.progressCB.bind(this);
        this.getImages = this.getImages.bind(this);
        this.state = {
            cards: []
        };
    }

    getImages(){
        var that = this;
        return new Promise(function(resolve, reject){
            libraryService.getImages().then(function(result){
                var library = [];
                for (var i=0; i<result.images.rows.length; i++){
                    var row = result.images.rows[i];
                    var image = {
                        id: row.id,
                        order: i+1,
                        url: row.url
                    }
                    library.push(image);
                }
                that.setState({
                    cards: library
                });
                resolve(result);
            }).catch(function(err){
                reject(err);
            });
        });

    }
    checkForAddedImages(files, cards){
        var imagesToAdd = [];
        for (var i=0; i<cards.length; i++){
            for(var j=0; j<files.length; j++){
                if (cards[i].file === files[j]){
                    var imageToAdd = {
                        file: files[j],
                        order: i+1
                    }
                    imagesToAdd.push(imageToAdd);
                }
            }
        }
        return imagesToAdd;
    }
    handleFilesAdded(files){
        var cards = this.state.cards;
        if (files){
            for (var j=0; j<files.length; j++){
                var file = files[j];
                var card = {
                    id: Math.floor(Math.random() * 1001)+1,
                    url: null,
                    file: file
                };
                cards.unshift(card);
            }
        }
        for (var i=0; i<cards.length; i++){
            cards[i].order = i+1;
        }
        var imagesToAdd = this.checkForAddedImages(files, this.state.cards);
        var that = this;
        libraryService.uploadFiles(imagesToAdd, this.progressCB).then(function(result){
            that.getImages().then(function(result){
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
    }
    progressCB(a){
    }
    handleImagesChanged(cards){
        this.setState({
            cards: cards
        });
    }
    handleImageDelete(id){
        var that = this;
        libraryService.deleteImage(id).then(function(result){
            that.getImages().then(function(images){
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
        
    }
    componentDidMount(){
        this.getImages().then(function(result){
        }).catch(function(err){
            console.log(err);
        });
    }
    render(){

        return(
            <Container>
                <ImageUploadLibrary 
                    cards={this.state.cards} 
                    onImageUploadFinished={this.onImageUploadFinished}
                    onFilesAdded={this.handleFilesAdded}
                    uploading={this.props.uploading}
                    uploadProgress={this.props.uploadProgress}
                    successfullyUploaded={this.props.successfullyUploaded}
                    onImagesChanged={this.handleImagesChanged}
                    onImageDelete={this.handleImageDelete}
                />
            </Container>
        );
    }
}

export default AccountLogos;
