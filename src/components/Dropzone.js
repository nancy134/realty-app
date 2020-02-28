import React, { Component } from 'react'
import './Dropzone.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCloudUploadAlt
} from '@fortawesome/free-solid-svg-icons';

class Dropzone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false
        };

        this.fileInputRef = React.createRef();
        this.openFileDialog = this.openFileDialog.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    openFileDialog() {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }
    onFilesAdded(evt) {
        if (this.props.disabled) return;
        const files = evt.target.files;
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
            this.props.onImagesAdded(array);
        }
    }
    fileListToArray(list) {
        const array = [];
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    }
    onDragOver(evt) {
        evt.preventDefault();

        if (this.props.disabled) return;

        this.setState({ highlight: true });
    }
    onDragLeave() {
        this.setState({ highlight: false });
    }
    onDrop(event) {
        event.preventDefault();

        if (this.props.disabled) return;

        const files = event.dataTransfer.files;
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
            this.props.onImagesAdded(array);
        }
        this.setState({ highlight: false });
    }
    render() {
    return (
        <div
            className={`Dropzone ${this.state.highlight ? "Highlight" : ""}`}
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
            onDrop={this.onDrop}
            onClick={this.openFileDialog}
            style={{ cursor: this.props.disabled ? "default" : "pointer" }}
        >
            <FontAwesomeIcon icon={faCloudUploadAlt} />
            <input
                ref={this.fileInputRef}
                className="FileInput"
                type="file"
                multiple
                onChange={this.onFilesAdded}
            />
            <span>Upload Images</span>
        </div>
    );
    }
}

export default Dropzone;
