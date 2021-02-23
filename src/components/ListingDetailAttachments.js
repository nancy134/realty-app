import React from 'react';
import {
    Row,
    Col,
    Image
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import ListingEditAttachments from './ListingEditAttachments';
import { saveAs } from 'file-saver';

const style = {
  marginRight: '.5rem',
  marginTop: '.5rem',
  cursor: 'pointer',
  display: 'inline-block',
  height: '80px'
};

function AttachmentItem(props){
    var display_url = "";
    if (props.attachment.fileType === "jpg" || props.attachment.fileType === "png"){
        display_url = "https://sabre-images.s3.amazonaws.com/IMG.png";
    } else if (props.attachment.fileType === "pdf"){
        display_url = "https://sabre-images.s3.amazonaws.com/PDF.png";
    } else {
        display_url = "https://sabre-images.s3.amazonaws.com/OTHER.png";
    }

    return (
        <span >
            <span className="border" style={{...style}}>
                <span className="img-wrap">
                    { props.editMode === "edit" ?
                    <span onClick={() => props.onDelete(props.attachment.id, props.attachment.name)} className="close">&times;</span>
                    : null }
                    <Image onClick={() => props.onDownload(props.attachment.id, props.attachment.url)} src={display_url} className="attachment-image p-2"/>
                    <div className="text-center">{props.attachment.name}</div>
                </span>
            </span>
        </span>
    );
}

function EditButton(props) {
    return (
        <span>
            <span
                id="overview_edit_button"
                onClick={() => props.onShow()}
                className="edit-button text-danger"
            >

                <FontAwesomeIcon size="xs" icon={faPlus} />&nbsp;Add Attachment 
            </span>
            {props.show ?
            <ListingEditAttachments
                listing = {props.listing}
                getListing={props.getListing}
                onAttachmentsAdded={props.onAttachmentsAdded}
                files={props.files}
                uploading={props.uploading}
                uploadProgress={props.uploadProgress}
                onSave={attachment => props.onSave(attachment)}

                show={props.show}
                onHide={props.onHide}
                saving={props.saving}
                errorMessage={props.errorMessage}

                onAttachmentsChanged={props.onAttachmentsChanged}
            />
            : null}
        </span>
    );
}

class ListingDetailAttachments extends React.Component {
    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleAttachmentsAdded = this.handleAttachmentsAdded.bind(this);
        this.getListing = this.getListing.bind(this);
        this.handleDeleteAttachment = this.handleDeleteAttachment.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
        this.state = {
            cards: []
        };
    }
    componentDidMount(){
        var cards = [];
        for (var i=0; i<4; i++){
            var card = {
                id: i,
                url: "https://sabre-images.s3.amazonaws.com/PDF.png",
                order: i+1,
                file: null
            }
            cards.push(card);
        }
        this.setState({
            cards: cards
        });
    }
    handleEdit(){
    }
    handleSave(attachment){
        this.props.onAttachmentsAdd(attachment);
    }
    handleAttachmentsAdded(files){
        this.props.onAttachmentsAdded(files);
    }
    getListing(){
        this.props.getListing();
    }
    handleDeleteAttachment(id, name){
        console.log("handleDeleteAttachment()");
        console.log("id: "+id);
        this.props.onAttachmentsDeleteModalShow(id, name);
    }
    handleDownload(index, url){
        saveAs(url,"attachment.jpg");
    }
    render() {
        var attachments = [];
        if (this.props.listing){
            attachments = this.props.listing.attachments;
        }

        const listing = this.props.listing;
        const editMode = this.props.editMode;

        return (
            <div className="m-4 shadow border">
                <Row className="mt-2 ml-0 mr-0">
                    <Col>
	                <h3>Attachments {editMode === "edit" ? 
                            <EditButton 
                                listing={listing} 
                                onSave={this.handleSave} 
                                getListing={this.props.getListing}
                                onAttachmentsAdded={this.handleAttachmentsAdded}
                                files={this.props.files}
                                uploading={this.props.uploading}
                                uploadProgress={this.props.uploadProgress}
                                successfullyUploaded={this.props.successfullyUploaded}

                                onShow={this.props.onAttachmentsModalAdd}
                                onHide={this.props.onAttachmentsModalHide}
                                show={this.props.attachmentsAdd}
                                saving={this.props.attachmentsSaving}
                                errorMessage={this.props.errorMessage}
                                onAttachmentsChanged={this.props.onAttachmentsChanged}
                            /> 
                            : null}</h3>
                    </Col>
                </Row>
                <Row className="mt-2 ml-0 mr-0">
                    <Col>
                    { attachments.map((attachment, index) => 
                        <AttachmentItem
                            attachment={attachment}
                            editMode={this.props.editMode}
                            index={index}
                            key={index}
                            onDelete={this.handleDeleteAttachment}
                            onDownload={this.handleDownload}
                        />
                    )}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ListingDetailAttachments;
