import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import StepperShareListing from '../components/StepperShareListing';
import ImageSelectContainer from '../components/ImageSelectContainer';
import libraryService from '../services/library';
import { SketchPicker } from 'react-color';

class ShareListingImages extends React.Component{
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handleSelectCard = this.handleSelectCard.bind(this);
        this.getImages = this.getImages.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.state = {
            cards: []
        };
    }

    handleChangeComplete(color){
        console.log("color: ");
        console.log(color);
        console.log("color.hex: "+color.hex);
        this.props.onSelectColor(color.hex);
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
    handleSelectCard(id, url){
        this.props.onSelectImage(id, url);
    }
    handleNext(){
        this.props.onNext();
    }

    componentDidMount(){
        this.getImages().then(function(result){
        }).catch(function(err){
            console.log(err);
        });
    }
    render(){
        return(
        <Modal
            show={this.props.show}
            onHide={this.props.onCancel}
            animation={false}
            dialogClassName="modal-60w"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>
                        Select images 
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StepperShareListing
                    selectShareMethodComplete={true}
                    selectShareContactsComplete={true}
                    selectShareImageActive={true}
                    methodType={this.props.methodType}
                />
                <Row>
                    <Col>
                        <p>Select header image</p>
                        <ImageSelectContainer
                            cards={this.state.cards}
                            onSelectCard={this.handleSelectCard}
                            selectedCard={this.props.selectedImage}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Select color scheme</p>
                        <SketchPicker
                            color={this.props.selectedColor}
                            onChangeComplete={this.handleChangeComplete}
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onCancel}
                >
                    <span>Cancel</span>
                </Button>
                <Button 
                    onClick={this.handleNext}
                >
                    <span>Next</span>
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}
export default ShareListingImages;
