import React, { Component } from 'react'
import './ImageUpload.css'
import Dropzone from './Dropzone'
import Progress from './Progress'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import {
    Image
} from 'react-bootstrap';

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [] 
        };

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.onImagesAdded = this.onImagesAdded.bind(this);
        this.renderProgress = this.renderProgress.bind(this);
    }
    onFilesAdded(files) {
        this.props.onFilesAdded(files);
    }
    onImagesAdded(files){
        var images = [];
        files.forEach(file => {
            images.push(URL.createObjectURL(file));
        });
        this.setState(prevState => ({
            images: prevState.images.concat(images)
        }));
    }
    renderProgress(file) {
        const uploadProgress = this.props.uploadProgress[file.name];
        if (this.props.uploading || this.props.successfullUploaded) {
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

                </div>
            );
        }
    }
    render(){
        if (this.props.files){
            var images = this.props.files.map((item,key) =>
                <div key={key}>
                <Image src={URL.createObjectURL(item)} className="edit-image" />
                {this.renderProgress(item)}
                </div>
            );
        }

        return (
        <div className="Upload">
            <div className="Content">
                <div>
                    <Dropzone
                        onFilesAdded={this.onFilesAdded}
                        onImagesAdded={this.onImagesAdded}
                        disabled={this.props.uploading || this.props.successfullUploaded}
                    />
                </div>
                <div className="Files">
                {images}
                </div>
            </div>
            <div className="Actions">
            </div>
        </div>
    );
  }
}
export default ImageUpload;
